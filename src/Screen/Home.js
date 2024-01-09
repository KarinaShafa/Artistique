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
import { StatusBar } from "expo-status-bar";
import ScheduleBooked from "../component/ScheduleBooked";
import Header from "../component/Header";
import colors from "../component/theme";
import { ThemeContext } from "../component/themeContext";
import { useNavigation } from "@react-navigation/native";
import DataArticles from "../component/DataArticle";
import RecomendationData from "../component/DataRecomendation";

const Home = () => {

  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const navigation = useNavigation();
  const DataArticle = DataArticles;
  const DataRecomendation = RecomendationData;

  const [dataArticleView, setDataArticleView] = useState(DataArticle);
  const [dataRecomendationView, setDataRecomendationView] = useState(DataRecomendation);
  const [search, setSearch] = useState(""); 
  const [category, setCategory] = useState([
    { categoryName: "Article" },
    { categoryName: "QnA" },
    { categoryName: "Recomendation" },
    { categoryName: "Search MUA" },
  ]);

  const categoryHandler = (props) => {
    if (props === "Search MUA") {     //kondisi
      navigation.navigate("MUA");
    } else if (props === "QnA") {
      navigation.navigate("Message");
    } else if (props === "Article") {
      setDataArticleView(DataArticle);
      setDataRecomendationView([]); // Reset dataRecomendationView saat memilih kategori Article
    } else if (props === "Recomendation") {
      setDataRecomendationView(DataRecomendation);
      setDataArticleView([]); // Reset dataArticleView saat memilih kategori Recomendation
    }
  };
  


  return (
    <Box flex={1}>
      <StatusBar
        style={theme.mode === "dark" ? "light" : "dark"} //menentukan tema 
        backgroundColor={activeColors.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false} //mengontrol tanda gulir
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
              <Text color={"#A01437"} fontWeight={"bold"}>
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
                onPress={() => categoryHandler(item.categoryName)}
              >
                <Text>{item.categoryName}</Text>
              </TouchableOpacity>
            )}
          />
        </Box>

        <Box>
          <FlatList
            data={dataArticleView}
            mb={5}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  elevation: 3, //shadow
                  marginBottom: 10,
                  marginTop: 10,
                  paddingBottom: 20,
                }}
                onPress={() =>
                  navigation.navigate("ArticleDetail", {
                    image: item.image,
                    title: item.judul,
                    content: item.content,
                  })
                }
              >
                <Box h={200} mb={3} roundedTopRight={10} roundedTopLeft={10}>
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

                <Box flexDirection={"row"}>
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
                  </Box>
                  <Box>
                  <Text
                    fontWeight={"bold"}
                    fontSize={18}
                    mx={2.5}
                    numberOfLines={2}
                    mt={1.5}
                  >
                    {item.judul.split(" ").map((word, index, array) => (
                      <React.Fragment key={index}>
                        {word} {index === array.length - 1 ? null : " "}
                        {index !== 0 && (index + 1) % 5 === 0 ? "\n" : null}
                      </React.Fragment>
                    ))}
                  </Text>
                  <Text mx={2} numberOfLines={2}>
                    {item.deskripsi.split(" ").map((word, index, array) => (
                      <React.Fragment key={index}>
                        {word} {index === array.length - 1 ? null : " "}
                        {index !== 0 && (index + 1) % 5 === 0 ? "\n" : null}
                      </React.Fragment>
                    ))}
                  </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            )}
          />
        </Box>

        {/* FlatList for Recomendation */}
          <Box>
            <FlatList
              data={dataRecomendationView}
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
                  onPress={() =>
                    navigation.navigate("DetailRecomendation", {
                      image: item.image,
                      title: item.judul,
                      content: item.content,
                    })
                  }
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

                  <Box flexDirection={"row"}>
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
                    </Box>
                    <Box>
                      <Text
                        fontWeight={"bold"}
                        fontSize={18}
                        mx={2.5}
                        numberOfLines={2}
                        mt={1.5}
                      >
                        {item.judul.split(" ").map((word, index, array) => (
                          <React.Fragment key={index}>
                            {word} {index === array.length - 1 ? null : " "}
                            {index !== 0 && (index + 1) % 5 === 0 ? "\n" : null}
                          </React.Fragment>
                        ))}
                      </Text>
                      <Text mx={2} numberOfLines={2}>
                        {item.deskripsi.split(" ").map((word, index, array) => (
                          <React.Fragment key={index}>
                            {word} {index === array.length - 1 ? null : " "}
                            {index !== 0 && (index + 1) % 5 === 0 ? "\n" : null}
                          </React.Fragment>
                        ))}
                      </Text>
                    </Box>
                  </Box>
                </TouchableOpacity>
              )}
            />
          </Box>
      </ScrollView>
    </Box>
  );
};

const HomeScreen = () => <Home />;

export default Home;