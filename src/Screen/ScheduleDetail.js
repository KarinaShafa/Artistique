import React, { useEffect, useState } from "react";
import { ScrollView, Box, Text, Image, Icon, Button } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/core";
import { useContext } from "react";
import { ThemeContext } from "../component/themeContext";
import colors from "../component/theme";
import { firestore } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { TouchableOpacity } from "react-native";

const ScheduleDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme, updateTheme } = useContext(ThemeContext);
  const [bookingData, setBookingData] = useState(null);
  let activeColors = colors[theme.mode];

  // Menangkap data yang dikirim dari halaman BookedDetail
  const {
    bookedDate,
    bookedTime,
    bookedFor,
    userName, 
    userImg,  
    specialty, 
    exp,
  } = route.params ? route.params : {};

  const navigateToHistoryBooking = () => {
    // Memeriksa apakah nilai-nilai yang diperlukan sudah ada
    if (bookedDate && userName && userImg) {
      // Navigasi ke HistoryBooked dengan membawa data
      navigation.navigate("HistoryBooking", {
        bookedDate,
        userName,
        userImg,
      });
    } else {
      // Menampilkan pesan kesalahan jika nilai-nilai yang diperlukan tidak ada
      console.error("One or more required values are undefined.");
    }
  };

  // Menggunakan useEffect untuk menyimpan data ke Firebase saat komponen dimount
  useEffect(() => {
    const fetchBookingData = async () => {
      const bookingsDocRef = doc(firestore, 'bookings', 'your-document-id'); // Replace 'your-document-id' with the actual document ID
      const bookingSnapshot = await getDoc(bookingsDocRef);
      
      if (bookingSnapshot.exists()) {
        setBookingData(bookingSnapshot.data());
      }
    };

    fetchBookingData();
  }, []);

  return (
    <ScrollView backgroundColor={activeColors.primary}>
      <Box bg={activeColors.secondary} p={4} mb={2} mt={3}>
        <Box flexDirection="row" alignItems="center">
          {/* Menampilkan gambar profil dari BookedDetail */}
          <Image
            source={userImg}
            alt="MUA Profile"
            size="100"
            borderRadius="50px"
          />
          <Box ml={4}>
            {/* Menampilkan nama dari BookedDetail */}
            <Text fontSize={20} color={activeColors.tint}>
              {userName}
            </Text>
            {/* Menampilkan spesialisasi dari BookedDetail */}
            <Text fontSize={16} color={activeColors.tertiary}>
              {specialty}
            </Text>
            {/* Menampilkan pengalaman dari BookedDetail */}
            <Text fontSize={12} color={activeColors.tertiary}>
              {`Experience: ${exp}`}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box bg={activeColors.secondary} p="4" mt="2" borderRadius="md" shadow={2}>
        {/* Menampilkan data tanggal yang dikirim dari BookedDetail */}
        <Box py={4} borderBottomWidth={0.5} borderBottomColor={activeColors.tint} mb={2}>
          <Text fontSize="16" color={activeColors.tint} fontWeight={600}>
            Booked Date
          </Text>
          <Text fontSize="16" py={2} color={activeColors.tertiary}>
            <Icon
              as={Ionicons}
              name="calendar"
              size={5}
              color={"#A01437"}
            />{" "}
            {bookedDate}
          </Text>
        </Box>

        {/* Menampilkan data waktu yang dikirim dari BookedDetail */}
        <Box py={4} borderBottomWidth={0.5} borderBottomColor={activeColors.tint} mb={2}>
          <Text fontSize="16" color={activeColors.tint} fontWeight={600}>
            Booked Time
          </Text>
          <Text fontSize="16" py={2} color={activeColors.tertiary}>
            <Icon
              as={Ionicons}
              name="alarm-outline"
              size={5}
              color={"#A01437"}
            />{" "}
            {bookedTime}
          </Text>
        </Box>

        {/* Menampilkan data yang dikirim untuk bookedFor dari BookedDetail */}
        <Box py={4} borderBottomWidth={0.5} borderBottomColor={activeColors.tint} mb={2}>
          <Text fontSize="16" color={activeColors.tint} fontWeight={600}>
            Information Booked
          </Text>
          <Text fontSize="16" py={2} color={activeColors.tertiary}>
            <Icon
              as={FontAwesome}
              name="info"
              size={5}
              color={"#A01437"}
            />{" "}
            {bookedFor}
          </Text>
        </Box>

        {/* Menampilkan data yang telah diambil dari Firestore */}
        {bookingData && (
          <Box bg={activeColors.secondary} p="4" mt="2" borderRadius="md" shadow={2}>
            <Text fontSize="16" color={activeColors.tint} fontWeight={600}>
              Data from Firestore
            </Text>
            {/* Contoh menampilkan data yang diambil dari Firestore */}
            <Text fontSize="16" py={2} color={activeColors.tertiary}>
              {`Booked Date from Firestore: ${bookingData.bookedDate}`}
            </Text>
            <Text fontSize="16" py={2} color={activeColors.tertiary}>
              {`Booked Time from Firestore: ${bookingData.bookedTime}`}
            </Text>
            <Text fontSize="16" py={2} color={activeColors.tertiary}>
              {`Booked For from Firestore: ${bookingData.bookedFor}`}
            </Text>
          </Box>
        )}
          <Box flexDirection={"row"} justifyContent={"center"} mt={40} mb={20}>
          <TouchableOpacity
            onPress={navigateToHistoryBooking}
            style={{
              backgroundColor: "#A01437",
              paddingVertical: 12,
              paddingHorizontal: 16,
              width: "85%",
              borderRadius: 10,
              shadowColor: "#A01437",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 8,
            }}
          >
            <Text
              color="white"
              fontSize="xl"
              textAlign="center"
            >
              Go To History Booked
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default ScheduleDetail;
