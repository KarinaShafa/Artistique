import React from "react";
import { ScrollView, Box, Text, Image, Icon } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/core";
import { useContext } from "react";
import { ThemeContext } from "../component/themeContext";
import colors from "../component/theme";

const ScheduleDetail = () => {
  const route = useRoute();

  const { theme, updateTheme } = useContext(ThemeContext);
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
      </Box>
    </ScrollView>
  );
};

export default ScheduleDetail;
