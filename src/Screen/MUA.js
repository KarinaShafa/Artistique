import { useContext, useState } from "react";
import {
  Box,
  ScrollView,
  Text,
  Center,
  Button,
  FlatList,
  Flex,
  Image,
  HStack,
  Icon,
  InputGroup,
  Input,
} from "native-base";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../component/Header";

const Data = [
  {
    id: "1",
    userName: "Clara Ayu Sheila",
    userImg: require("../../assets/Chat/MUA1.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '4.5',
    specialty: "Make Up Graduation, Wedding",
    exp: "15 years",
  },
  {
    id: "2",
    userName: "Natashalief",
    userImg: require("../../assets/Chat/MUA2.jpg"),
    star: <FontAwesome name="star" color="purple" size={12}/>,
    text: '4.6',
    specialty: "Make Up Graduation",
    exp: "12 years",
  },
  {
    id: "3",
    userName: "Hilga Doui",
    userImg: require("../../assets/Chat/MUA3.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '4.9',
    specialty: "Bold Make Up, Wedding",
    exp: "7 years",
  },
  {
    id: "4",
    userName: "Fauziah Hanum",
    userImg: require("../../assets/Chat/MUA4.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '5',
    specialty: "Korean Make Up",
    exp: "14 years",
  },
  {
    id: "5",
    userName: "Ochi Pramita",
    userImg: require("../../assets/Chat/MUA5.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '4.8',
    specialty: "Thailand Make Up",
    exp: "12 years",
  },
];

const MUA = () => {
  // const theme = { mode: "dark" };
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(); //menghilangkan keyboard jika user menekan layar di luar keyboard
      }}
    >
      <Box flex={1}>
        <Box flex={1} pl={5} pr={5} backgroundColor={activeColors.primary}>
          <Center>
            <Box mt={40}>
              {/* search */}
              <HStack alignItems="center" space={2} p={2} rounded="md"> 
                <Input
                  placeholder="Search MUA"
                  color={activeColors.tint}
                  placeholderTextColor={activeColors.tint}
                  size="lg"
                  w={"87%"}
                  rounded={12}
                />
                <Box backgroundColor={"#A01437"} p={2} rounded={6}>
                  <Icon as={Ionicons} name="search" size={6} color={"white"} />
                </Box>
              </HStack>
            </Box>
            <Box mt={4}>
              <FlatList
                data={Data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ width: "100%" }}>
                    <Box justifyContent={"space-between"}>
                      <Flex direction="row">
                        <Box pt={4} pb={4}>
                          <Image
                            w={"60"}
                            h={"60"}
                            rounded={"35"}
                            source={item.userImg}
                            alt="ProfileUserChat"
                          />
                        </Box>
                        <Box
                          justifyContent={"center"}
                          p={"15"}
                          pl={0}
                          ml={"3"}
                          w={"300"}
                          borderBottomWidth={"1"}
                          borderBottomColor={"#cccccc"}
                        >
                          <Flex direction="column">
                            <Box mb={"1"}>
                              <Flex direction="row" justifyContent="space-between" alignItems="center" width="100%">
                                <HStack alignItems="center" space={32} width="70%">
                                  <HStack>
                                    <Text
                                      fontSize={"14"}
                                      fontWeight={"bold"}
                                      color={activeColors.tint}
                                    >
                                      {item.userName}
                                    </Text>
                                  </HStack>
                                  <HStack alignItems="center" space={2}>
                                    {item.star}
                                    <Text>{item.text}</Text> 
                                  </HStack>
                                </HStack>
                              </Flex>
                            </Box>
                            <Text
                              fontSize={"14"}
                              mr={10}
                              color={activeColors.tertiary}
                            >
                              {item.specialty}
                            </Text>
                            <HStack space={16}>
                              <Text
                                fontSize={"14"}
                                mr={10}
                                color={activeColors.tertiary}
                              >
                                Exp: <Text fontWeight="bold">{item.exp}</Text>
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  navigation.navigate("MUADetails", {
                                    MUAData: {
                                      userName: item.userName,
                                      userImg: item.userImg,
                                      text: item.text,
                                      specialty: item.specialty,                            
                                      exp: item.exp,
                                      reviews: item.reviews,
                                    },
                                  })
                                }
                              >
                                <Text color={"#A01437"} fontWeight={600}>
                                  More
                                  <Icon
                                    as={Ionicons}
                                    name="chevron-forward-outline"
                                    size={4}
                                    ml="2"                                    
                                    color={"#A01437"}
                                  />
                                </Text>
                              </TouchableOpacity>
                            </HStack>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  </TouchableOpacity>
                )}
              />
            </Box>
          </Center>
        </Box>
        {/* </ScrollView> */}
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default MUA;