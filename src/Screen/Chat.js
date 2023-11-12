import { useContext } from "react";
import {
  Box,
  Text,
  Center,
  FlatList,
  Flex,
  Image,
  HStack,
  Input,
  Icon,
} from "native-base";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Messages from "../component/DataChat";



const PesanScreen = () => {
  // const theme = { mode: "dark" };
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Box flex={1}>
        <Box flex={1} pl={5} pr={5} backgroundColor={activeColors.primary}>
          <Center>
            <Box>
              <HStack alignItems="center" space={2} p={2} rounded="md">
                <Input
                  placeholder="Search.."
                  color={activeColors.tint}
                  placeholderTextColor={activeColors.tint}
                  size="sm"
                  w={"87%"}
                  rounded={24}
                />
                <TouchableOpacity>
                  <Box backgroundColor={"#A01437"} p={2} rounded={12}>
                    <Icon
                      as={Ionicons}
                      name="search"
                      size={6}
                      color={"white"}
                    />
                  </Box>
                </TouchableOpacity>
              </HStack>
            </Box>
            <FlatList
              data={Messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ width: "100%" }}
                  // saat ditekan data akan ikut dibawah ke roomchat
                  onPress={() =>
                    navigation.navigate("RoomChat", {
                      userName: item.userName,
                      messageText: item.messageText,
                      userImg: item.userImg,
                    })
                  }
                >
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
                        w={"100%"}
                        borderBottomWidth={"1"}
                        borderBottomColor={"#cccccc"}
                      >
                        <Flex direction="column">
                          <Box mb={"1"}>
                            <Flex direction="row">
                              <HStack space={32}>
                                <Text
                                  fontSize={"14"}
                                  fontWeight={"bold"}
                                  color={activeColors.tint} 
                                  w={78}
                                >
                                  {item.userName}
                                </Text>

                                <Box ml={-10}>
                                  <Text fontSize={12} color={activeColors.tint}>
                                    {item.messageTime}
                                  </Text>
                                </Box>
                              </HStack>
                            </Flex>
                          </Box>
                         
                          <Text fontSize={"14"} color={activeColors.tertiary}>
                            {item.messageText.length > 40
                              ? item.messageText.slice(0, 40) + "..."
                              : item.messageText}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </Center>
        </Box>
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default PesanScreen;