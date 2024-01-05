import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image, Flex } from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import colors from "./theme";

const ScheduleBooked = () => {

  const navigation = useNavigation();

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
          >
  
          </TouchableOpacity>
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
            <TouchableOpacity style={{ padding: 20, borderRadius: 10 }} onPress={() => navigation.navigate('ScheduleDetail')}>
              <Box style={{ flexDirection: "row" }}>
                <Image
                  source={require("../image/MUA1.jpg")}
                  alt="MUA Profile"
                  w={12}
                  h={12}
                  rounded={25}
                  backgroundColor={"#FFFFFF"}
                />
                <Box flex={1} ml={3} justifyContent={"center"}>
                  <Text color={"#FFFFFF"} fontWeight={"bold"}>
                    Clara Ayu Sheila
                  </Text>
                  <Text color={"#f4f4f4"}>Make Up Artist</Text>
                </Box>
              </Box>

              <Box mt={5}>
                <Box>
                  <Flex direction="row">
                    <Icon name="calendar-outline" size={25} color="#FFFFFF" />
                    <Box justifyContent={"center"} alignItems={"center"}>
                      <Text color={"#FFFFFF"} ml={2.5}>
                        25 Juni 2023
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Box style={{ flexDirection: "row" }}>
                  <Flex direction="row">
                    <Icon name="logo-instagram" size={25} color="#FFFFFF" />
                    <Box
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Text
                      color={"#FFFFFF"}
                      ml={2.5}>
                        @makeupbycla
                      </Text>
                    </Box>
                  </Flex>
                </Box>
                <Box
                  justifyContent={'center'}
                  alignItems={'flex-end'}
                >
                  <Icon
                    name="chevron-forward-circle"
                    size={35}
                    color="#FFFFFF"
                  />
                </Box>
              </Box>
            </TouchableOpacity>
          </LinearGradient>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleBooked;