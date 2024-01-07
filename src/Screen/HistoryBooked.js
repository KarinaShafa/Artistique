import React, { useCallback, useState, useContext } from "react";
import {
  Box,
  ScrollView,
  Text,
  Center,
  FlatList,
  Flex,
  Image,
  HStack,
  Icon,
  Modal,
} from "native-base";
import { TouchableOpacity, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../../firebase-config";
import { initializeApp } from "firebase/app";

const HistoryBooked = () => {
  const DB = initializeApp(firebaseConfig);
  const firestore = getFirestore(DB);

  const DataBooking = collection(firestore, "bookings");

  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [selectedImage, setSelectedImage] = useState(null);

  const [data, setData] = useState([]);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchingData = async () => {
        try {
          const bookingData = await AsyncStorage.getItem("BookingData");
          let bookingDataState = [];
          if (bookingData !== null) {
            const parsedBookingData = JSON.parse(bookingData);
            bookingDataState = parsedBookingData;
            console.log("Data from AsyncStorage:", bookingDataState);
            // Gunakan parsedBookingData untuk menampilkan atau memproses data yang diambil dari AsyncStorage
          } else {
            console.log("No data found in AsyncStorage for bookings");
          }

          setData(bookingDataState);
        } catch (error) {
          console.error("Error fetching data from AsyncStorage:", error);
        }
      };

      fetchingData();
    }, [])
  );

  console.log("Data Booking :  ", data);

  const handleCancelBooking = async (userName) => {
    try {
      console.log("Cancel Booking for User:", userName);
  
      // Tambahkan alert konfirmasi
      Alert.alert(
        "Cancellation Confirmation",
        `Are you sure you want to cancel your booking for ${userName}?`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              // Pastikan userName memiliki nilai yang valid sebelum melanjutkan
              if (!userName) {
                console.error("Invalid userName for cancellation");
                return;
              }

              const updatedData = data.filter((booking) => booking.userName !== userName);

              // Hapus data dari Firestore
              const querySnapshot = await getDocs(
                query(DataBooking, where("userName", "==", userName))
              );

              querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                console.log("Data berhasil dihapus dari Firestore");
              });

              // Simpan kembali data setelah penghapusan
              await AsyncStorage.setItem("BookingData", JSON.stringify(updatedData));
              // Perbarui state jika diperlukan
              setData(updatedData);

              // Simpan data terakhir ke AsyncStorage
              const lastBooking = updatedData.length > 0 ? updatedData[updatedData.length - 1] : null;
              await AsyncStorage.setItem("LastBooking", JSON.stringify(lastBooking));
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
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
      <Box>
        <Box backgroundColor={activeColors.primary}>
          <Center>
            <Box mt={4}>
              {data.length === 0 ? (
                <Box
                  p={4}
                  
                >
                  <Text fontSize="18" color={activeColors.tint} textAlign="center">
                    There is No Booking History
                  </Text>
                </Box>
              ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.BookingID}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    onPress={() =>
                      navigation.navigate("ScheduleDetail", {
                        bookedDate: item.bookedDate,
                        bookedTime: item.bookedTime,
                        bookedFor: item.bookedFor,
                        userName: item.userName,
                        userImg: item.userImg,
                        specialty: item.specialty,
                        exp: item.exp,
                      })
                    }
                  >
                    <Box
                      justifyContent="space-between"
                      backgroundColor={activeColors.secondary}
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
                            source={{ uri: item.userImg }}
                            alt="MUA"
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
                            <Flex direction="row" justifyContent="space-between">
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
                                    <MenuOption
                                      text="Cancel"
                                      onSelect={() => handleCancelBooking(item.userName)}
                                    />
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
                        </Flex>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                )}
              />
            )}
            </Box>
          </Center>
        </Box>
      </Box>
    </MenuProvider>
  );
};

export default HistoryBooked;
