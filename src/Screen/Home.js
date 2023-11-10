import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  HStack,
  Button,
  Text,
  FlatList,
  Box,
  Image,
  Flex,
  Pressable,
} from "native-base";
import { TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
// import LinearGradient from "expo-linear-gradient";

import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ScheduleBooked from "../component/ScheduleBooked";
import Header from "../component/Header";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
// import { ThemeContext } from "../component/themeContext";

const Home = () => {
  // const theme = { mode: "dark" };
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([
    { categoryName: "Article" },
    { categoryName: "QnA" },
    { categoryName: "Recomendation" },
    { categoryName: "Search MUA" },
    { categoryName: "MUA Nearby" },
  ]);

  const [article, setArticle] = useState([
    {
      title: "Bikin Kulit Glowing dan Sehat",
      description: "Ini Dia Tren Skincare Skinimalism yang Bisa Dicoba!",
      image: require("../image/ARTICLE2.jpg"),
    },
    {
      title: "Tampil Playful dengan 5 Eyeliner Berwarna",
      description: "ganti eyeliner hitam menjadi warna-warni!",
      image: require("../image/ARTICLE1.png"),
    },
    {
      title: "Membuat Pipi Merona Alami dan Fresh",
      description: "Cobain 2 Blush Pemenang Female Daily Best",
      image: require("../image/ARTICLE3.png"),
    },
  ]);

  return (
    <SafeAreaView flex={1}>
      <StatusBar
        style={theme.mode === "dark" ? "light" : "dark"}
        backgroundColor={activeColors.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        mx={0}
        paddingX={5}
        mt={0}
        backgroundColor={activeColors.primary}
      >
        <Header search={search} setSearch={setSearch} />
        <ScheduleBooked />
        <Box>
          <Flex direction="row" mt={30}>
            <Text color={"#8A527D"} fontWeight={"bold"}>
              Category
            </Text>
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <Text
              color={"#A01437"}
              fontWeight={"bold"}
              >
                View More
              </Text>
            </TouchableOpacity>
          </Flex>
        </Box>

        <Box>
          <FlatList
            data={category}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 10,
                  marginRight: 10,
                  paddingHorizontal: 10,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 25,
                  elevation: 3,
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                <Text>{item.categoryName}</Text>
              </TouchableOpacity>
            )}
          />
        </Box>

        <Box>
          <FlatList
            data={article}
            mb={5}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  elevation: 3,
                  marginBottom: 10,
                  marginTop: 10,
                  paddingBottom: 20,
                }}
              >
                <Box
                  h={200}
                  mb={3}
                  roundedTopRight={10}
                  roundedTopLeft={10}
                >
                  <ImageBackground
                    source={item.image}
                    style={{
                      flex: 1,
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                    imageStyle={{
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  />
                </Box>

                <Box>
                  <Image
                    source={item.image}
                    w={10}
                    h={10}
                    rounded={20}
                    borderColor={"white"}
                    borderWidth={2}
                    ml={2.5}
                    mt={1.5}
                    alt="MUA"
                  />
                  <Text
                    fontWeight={"bold"}
                    fontSize={18}
                    mx={2.5}
                    mt={1.5}
                  >
                    {item.title}
                  </Text>
                  <Text
                  mx={2.5}
                  >
                    {item.description}
                  </Text>
                </Box>
              </TouchableOpacity>
            )}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeScreen = () => <Home />;

export default Home;