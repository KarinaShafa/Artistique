import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image, Flex } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDocs, collection, query, getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../../firebase-config";
import { initializeApp } from "firebase/app";

const ScheduleBooked = () => {
  const [data, setData] = useState([]);
  const [hasBooking, setHasBooking] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DB = initializeApp(firebaseConfig);
        const firestoreDB = getFirestore(DB);

        const bookingsCollectionRef = collection(firestoreDB, "bookings");
        const querySnapshot = await getDocs(bookingsCollectionRef);

        if (!querySnapshot.empty) {
          const bookingData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(bookingData);
        } else {
          setHasBooking(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Box mt={1}>
        <Flex direction="row">
          <Text color={"#8A527D"} fontWeight={"bold"}>
            Schedule Booked
          </Text>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "flex-end",
              flex: 1,
            }}
          ></TouchableOpacity>
        </Flex>
      </Box>
      <Box>
        <Box rounded={3} mt={3}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 10 }}
            colors={["#A01437", "#8A527D"]}
          >
            {hasBooking ? (
              data.length > 0 ? (
                data.map((item) => (
                  <Flex key={item.id} direction="row" justifyContent="space-between">
                    <Box style={{ flexDirection: "row" }}>
                      <Image
                        source={{ uri: item.userImg }}
                        alt="MUA Profile"
                        w={12}
                        h={12}
                        mt={2}
                        ml={2}
                        justifyContent={"center"}
                        rounded={25}
                        backgroundColor={"#FFFFFF"}
                      />
                      <Box flex={1} ml={3} justifyContent={"center"}>
                        <Text color={"#FFFFFF"} fontWeight={"bold"}>
                          {item.userName}
                        </Text>
                        <Text color={"#FFFFFF"}>{item.bookedDate}</Text>
                        <Text color={"#FFFFFF"}>{item.bookedTime}</Text>
                        <Text color={"#FFFFFF"}>{item.bookedFor}</Text>
                      </Box>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text color={"#FFFFFF"}>No booking yet</Text>
              )
            ) : (
              <Text color={"#FFFFFF"}>No booking yet</Text>
            )}
          </LinearGradient>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleBooked;