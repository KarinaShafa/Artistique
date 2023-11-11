import React, { useContext, useState } from "react";
import {
  Box,
  Center,
  FlatList,
  Flex,
  Image,
  Text,
  HStack,
  Icon,
} from "native-base";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import BookedDetail from "./BookedDetail"; 

const Data = [
  {
    id: "1",
    userName: "Clara Ayu Sheila",
    userImg: require("../../assets/Chat/MUA1.jpg"),
    specialty: "Makeup Graduation, Wedding",
    exp: "15 years",
  },
  {
    id: "2",
    userName: "Nathasalief",
    userImg: require("../../assets/Chat/MUA2.jpg"),
    specialty: "Makeup Graduation",
    exp: "12 years",
  },
  {
    id: "3",
    userName: "Hilga Doui",
    userImg: require("../../assets/Chat/MUA3.jpg"),
    specialty: "Bold Makeup, Wedding",
    exp: "7 years",
  },
  {
    id: "4",
    userName: "Fauziah Hanum",
    userImg: require("../../assets/Chat/MUA4.jpg"),
    specialty: "Korean Makeup",
    exp: "14 years",
  },
  {
    id: "5",
    userName: "Ochi Pramita",
    userImg: require("../../assets/Chat/MUA5.jpg"),
    specialty: "Thailand Makeup",
    exp: "12 years",
  },
];

const BookedScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];
  const navigation = useNavigation();
  const [selectedMakeupArtist, setSelectedMakeupArtist] = useState(null);

  const handleBookNow = (customerName, selectedDate, selectedMakeupType) => {
    if (customerName && selectedDate && selectedMakeupType) {
      console.log("Booking details:", {
        makeupArtist: selectedMakeupArtist.userName,
        date: selectedDate,
        makeupType: selectedMakeupType,
        customerName,
      });
      setSelectedMakeupArtist(null);
    } else {
      alert("Please fill in all details.");
    }
  };

  return (
    <MenuProvider
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box flex={1}>
        <Box flex={1} backgroundColor={activeColors.primary}>
          <Center>
            <Box mt={4}>
              <FlatList
                data={Data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    onPress={() => setSelectedMakeupArtist(item)}
                  >
                    <Box
                      justifyContent="space-between"
                      backgroundColor="white"
                      p={3}
                      mb={3}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <Box pt={4} pb={4}>
                        <Image
                          w={"70"}
                          h={"70"}
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
                      >
                        <Flex direction="column">
                          <Box mb={"1"}>
                            <Flex
                              direction="row"
                              justifyContent="space-between"
                            >
                              <Box>
                                <Text
                                  fontSize={"14"}
                                  fontWeight={"bold"}
                                  color={activeColors.tint}
                                >
                                  {item.userName}
                                </Text>
                              </Box>
                              <Box mr={8}>
                                <Menu>
                                  <MenuTrigger>
                                    <Icon
                                      as={Ionicons}
                                      name="ellipsis-vertical-outline"
                                      size={6}
                                      color={activeColors.tertiary}
                                    />
                                  </MenuTrigger>
                                  <MenuOptions>
                                    <MenuOption text="Cancel" />
                                    <MenuOption text="Reschedule" />
                                  </MenuOptions>
                                </Menu>
                              </Box>
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
                              <Text fontWeight="bold">{item.date1}</Text>
                            </Text>
                          </HStack>
                        </Flex>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                )}
              />
            </Box>
          </Center>
        </Box>
      </Box>
      {selectedMakeupArtist && (
        <BookedDetail
          makeupArtist={selectedMakeupArtist}
          onClose={() => setSelectedMakeupArtist(null)}
          onBookNow={handleBookNow}
        />
      )}
    </MenuProvider>
  );
};

export default BookedScreen;
