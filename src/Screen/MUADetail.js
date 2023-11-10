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

const MUADetails = () => {

  const route = useRoute();
  //   const initialName = route.params ? route.params.userName : "";
  //   const initialUserImg = route.params ? route.params.userImg : null;
  //   const initialStar = route.params ? route.params.star : "";
  //   const initialText = route.params ? route.params.text : "";
  //   const initialSpecialty = route.params ? route.params.speciality : "";
  //   const initialExp = route.params ? route.params.exp : "";
  //   const initialReviews = route.params ? route.params.reviews : "";

  const initialData = route.params ? route.params.MUAData : null;

  // Kemudian, Anda dapat mengakses data seperti ini:
  const userName = initialData.userName;
  const userImg = initialData.userImg;
//   const star = initialData.star;
  const text = initialData.text;
  const specialty = initialData.specialty;
  const exp = initialData.exp;
  const reviews = initialData.reviews;

  const MUAData = [
    {
      name: userName,
      userImg: userImg,
      speciality: specialty,
      // rating: {
      //   star: <FontAwesome name="star" color="orange" size={12} />,
      //   text: <Text>4.8</Text>,
      // },
    //   star: star,
      text: text,
      exp: exp,
      reviews: reviews,
      about:
        ".",
    },
  ];

  return (
    <ScrollView>
      <Box flex={1} p={2}>
        <Box bg="#EBB9BB" p={2} mb={2}>
          <Box flexDirection="row" alignItems="center">
            <Image
              source={MUAData[0].userImg} // Ganti dengan URL gambar profil MUA
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
                {/* {console.log(MUAData[0].text)}
                {console.log(initialName)}
                {console.log(initialSpecialty)} */}
              </Text>
            </Box>
          </Box>
        </Box>

        <Box bg="#EBB9BB" p={2} mb={2}>
          <Text fontWeight={"bold"}>About MUA</Text>
          <Text>{MUAData[0].about}</Text>
        </Box>

        <Box bg="white" p={2}>
          <Text>
            Experience: <Text fontWeight={"bold"}>{MUAData[0].exp}</Text>
          </Text>
          <Text>
            Reviews: <Text fontWeight={"bold"}>{MUAData[0].reviews}</Text>
          </Text>
        </Box>

        <Box bg="white" p={2}>
          <Text mb={1}>Service at</Text>
          <Text fontWeight={600}>Beauty Salon</Text>
          <Text color={"gray.600"}>
            <Icon
              as={Ionicons}
              name="location-outline"
              size={5}
              color="gray.600"
            />
            Tangerang, Jakarta, Indonesia
          </Text>
          <Center>
            <TouchableOpacity onPress={() => {}}
              style={{
                width: "85%",
                backgroundColor: "#0082f7",
                borderRadius: 12,
                marginVertical: 12,
              }}
            >
              <Text
                textAlign="center"
                fontSize={16}
                // fontFamily="NotoSansBlack"
                color="#fff"
                py={3}
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