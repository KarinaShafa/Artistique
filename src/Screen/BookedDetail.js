import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  Box,
  Button,
  Input,
  HStack,
  Center,
  ScrollView,
  Image,
  FlatList,
  Icon,
} from "native-base";
import moment from "moment";
import Swiper from "react-native-swiper";
import {
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../component/themeContext";
import colors from "../component/theme";
import { firestore } from '../../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const BookedDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();

	const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const {
    userName,
    userImg,
    specialty,
    exp,
  } = route.params ? route.params : {};

  const [selectedTime, setSelectedTime] = useState("05:00 AM");
  const [initialTimeSelected, setInitialTimeSelected] = useState(true);
  const [message, setMessage] = useState("");

  const timeSlots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    time: `${i + 3}:00 am`,
  }));

  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);

  const weeks = useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");

        return {
          weekday: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const handleConfirmBooked = async () => {
    if (!message.trim()) {
      // Tampilkan alert jika bookedFor belum diisi
      alert("Please fill in the 'Booked For' field before confirming the booking.");
      return;
    }

    // Simpan data ke AsyncStorage
    try {
      const bookingData = await AsyncStorage.getItem("BookingData");
      let bookingDataState = [];
      if (bookingData !== null) {
        const parsedBookingData = JSON.parse(bookingData);
        bookingDataState = parsedBookingData;
      }

      const newBooking = {
        id: (bookingDataState.length + 1).toString(), // Assign ID, bisa diganti sesuai kebutuhan
        userName,
        userImg,
        specialty,
        exp,
        bookedDate: new Date().toDateString(),
        bookedTime: selectedTime,
        bookedFor: message,
      };

      bookingDataState.push(newBooking);

      await AsyncStorage.setItem("BookingData", JSON.stringify(bookingDataState));
      // Navigasi ke halaman ScheduleDetail
      navigation.navigate('ScheduleDetail', newBooking);
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }

    // Simpan data ke Firestore
    const bookingsCollection = collection(firestore, 'bookings');
    const docRef = await addDoc(bookingsCollection, {
      userName,
      userImg,
      specialty,
      exp,
      bookedDate: new Date().toDateString(),
      bookedTime: selectedTime,
      bookedFor: message,
    });

    // Navigasi ke halaman ScheduleDetail
    navigation.navigate('ScheduleDetail', {
      userName,
      userImg,
      specialty,
      exp,
      bookedDate: new Date().toDateString(),
      bookedTime: selectedTime,
      bookedFor: message,
    });
  };

  return (
    <ScrollView backgroundColor={activeColors.primary}>
    <Box bg={activeColors.secondary} p={4} mb={2} mt={3}>
      <Box flexDirection="row" alignItems="center">
        <Image
          source={userImg}
          alt="MUA Profile"
          size="100"
          borderRadius="50px"
        />
        <Box ml={4}>
          <Text fontSize={20} color={activeColors.tint}>
            {userName}
          </Text>
          <Text fontSize={16} color={activeColors.tertiary}>
            {specialty}
          </Text>
          <Text fontSize={12} color={activeColors.tertiary}>
            {`Experience: ${exp}`}
          </Text>
        </Box>
      </Box>
    </Box>

      <Box bg={activeColors.secondary} p="2" my="4" borderRadius="md" shadow={2}>
        <Text fontSize="16" p={2} color={activeColors.tint} fontWeight={800}>
          Select Date
        </Text>
        <Text fontSize="16" color={activeColors.tint} textAlign={"center"}>
          {value.toDateString()}
        </Text>

        <Box flex={1}>
          <Box
            flex={1}
            maxH={74}
            py={3}
            flexDirection={"row"}
            alignItems={"center"}
          >
            <Swiper
              index={1}
              ref={swiper}
              loop={false}
              showsPagination={false}
              onIndexChanged={(ind) => {
                if (ind === 1) {
                  return;
                }
                setTimeout(() => {
                  const newIndex = ind - 1;
                  const newWeek = week + newIndex;
                  setWeek(newWeek);
                  setValue(moment(value).add(newIndex, "week").toDate());
                  swiper.current.scrollTo(1, false);
                }, 0);
              }}
            >
              {weeks.map((dates, index) => (
                <Box
                  key={index}
                  width={width}
                  flexDirection={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  mx={-2}
                  px={2}
                >
                  {dates.map((item, dateIndex) => {
                    const isActive =
                      value.toDateString() === item.date.toDateString();
                    return (
                      <TouchableWithoutFeedback
                        key={dateIndex}
                        onPress={() => setValue(item.date)}
                      >
                        <Box
                          borderColor={isActive ? "#0082f" : "#e3e3e3"}
                          backgroundColor={isActive ? "#A01437" : "transparent"}
                          flex={1}
                          h={50}
                          mx={1}
                          borderWidth={1}
                          rounded={8}
                          flexDirection={"column"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize={13}
                            fontWeight={500}
                            color={isActive ? "#fff" : activeColors.tertiary}
                            mb={1}
                          >
                            {item.weekday}
                          </Text>
                          <Text
                            fontSize={15}
                            fontWeight={600}
                            color={isActive ? "#fff" : activeColors.tint}
                          >
                            {item.date.getDate()}
                          </Text>
                        </Box>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </Box>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>

      <Box bg={activeColors.secondary} p="2" my="2" borderRadius="md" shadow={2}>
        <Text fontSize="16" p={2} color={activeColors.tint} fontWeight={800}>
          Select Booked Time
        </Text>
        <Center>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={timeSlots}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const formattedTime = moment(item.time, "h:mm a").format(
                "hh:mm A"
              );
              const isActive =
                selectedTime === item.time ||
                (initialTimeSelected && formattedTime === "05:00 AM");

              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSelectedTime(item.time);
                    setInitialTimeSelected(false); // Setelah memilih, nonaktifkan value awal
                  }}
                >
                  <Box
                    p="2"
                    my={4}
                    mx={1}
                    borderWidth={1}
                    rounded={12}
                    bg={isActive ? "#A01437" : "transparent"}
                    borderColor={isActive ? "#0082f" : "#e3e3e3"}
                  >
                    <Text fontWeight={500} color={isActive ? "white" : "#A01437"}>
                      {formattedTime}
                    </Text>
                  </Box>
                </TouchableWithoutFeedback>
              );
            }}
          />
        </Center>
      </Box>

      <Box bg={activeColors.secondary} p="4" my="4" borderRadius="md" shadow={2}>
        <Text fontSize="16" fontWeight={800} color={activeColors.tint}>
          Booked for
        </Text>
        <Input
          placeholder="e.g makeup wedding, makeup graduation, etc."
          backgroundColor={"gray.100"}
          placeholderTextColor={"muted"}
          rounded={6}
          value={message}
          onChangeText={(msg) => setMessage(msg)}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          my={3}
        />
        <TouchableOpacity
					style={{ 
						backgroundColor: "#A01437",
						borderRadius: 8
					 }}
           onPress={handleConfirmBooked}
        >
        <Text py={3} textAlign={'center'} color={'white'}>
          Confirm Booked
				</Text>
        </TouchableOpacity>
      </Box>
    </ScrollView>
  );
};

export default BookedDetail;
