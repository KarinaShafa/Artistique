import React from "react";
import {
  Box,
  Text,
  Button,
  Image,
  ScrollView,
  Icon,
  Center,
} from "native-base";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/core";
import { useNavigation } from "@react-navigation/native";


const MUADetails = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const initialData = route.params ? route.params.MUAData : null; //mengecek MUAData ada atau tidak

  // dapat mengakses data seperti ini:
  const userName = initialData.userName;
  const userImg = initialData.userImg;
  const text = initialData.text;
  const specialty = initialData.specialty;
  const exp = initialData.exp;
  const reviews = initialData.reviews;
  const about = initialData.about;
  const sosmed = initialData.sosmed;

  const MUAData = [
    {
      name: userName,
      userImg: userImg,
      speciality: specialty,
      text: text,
      exp: exp,
      reviews: reviews,
      about: about,
      sosmed: sosmed,
    },
  ];

  return (
    <ScrollView bg="#EBB9BB">
      <Box flex={1} p={2}>
        <Box bg="#EBB9BB" p={2} mb={2}>
          <Box flexDirection="row" alignItems="center">
            <Image
              source={MUAData[0].userImg} 
              alt="MUA Profile"
              size="100"
              borderRadius="50px"
            />
            <Box ml={4}>
              <Text fontSize={20}>{MUAData[0].name}</Text>
              <Text fontSize={16} color={"gray.600"}>
                {MUAData[0].speciality}
              </Text>
              <Text fontSize={12} color={"gray.600"}>
                Rating:
                <FontAwesome name="star" color="purple" size={12} /> <Text>{MUAData[0].text}</Text> 
              </Text>
            </Box>
          </Box>
        </Box>

        <Box bg="#EBB9BB" p={2} mb={2}>
          <Text fontWeight={"bold"}>About MUA</Text>
          <Text>{MUAData[0].about}</Text>
        </Box>

        <Box bg="#EBB9BB" p={2}>
          <Text>
            Experience: <Text fontWeight={"bold"}>{MUAData[0].exp}</Text>
          </Text>
          <Text>
            Instagram: <Text fontWeight={"bold"}>{MUAData[0].sosmed}</Text>
          </Text>
        </Box>

        <Box bg="#EBB9BB" p={2}>
          <Center>
          <TouchableOpacity
            onPress={() => {
              // dialihkan ke halaman roomchat
              navigation.navigate("RoomChat", {
                userName: userName,
                messageText: "Welcome to Artistique", 
                userImg: userImg,
                
              });
            }}
            style={{
              width: "85%",
              backgroundColor: "#A01437",
              borderRadius: 12,
              marginVertical: 12,
              paddingVertical: 12,
            }}
          >
            <Text
              textAlign="center"
              fontSize={16}
              color="#fff"
            >
              Chat Now
            </Text>
          </TouchableOpacity>

          </Center>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default MUADetails;