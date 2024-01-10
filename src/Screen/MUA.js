import { useContext, useState, useEffect } from "react";
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
    exp: "10 years",
    about: "Clara Ayu Sheila adalah seorang makeup artist berbakat yang telah mengejar karirnya dalam industri kecantikan. Dengan fokus khusus pada makeup untuk kelulusan dan pernikahan, Clara Ayu Sheila berkomitmen untuk membuat momen spesial Anda terasa lebih istimewa dan berkesan.",
    sosmed: "@makeupbycla @claraayusheila",
  },
  {
    id: "2",
    userName: "Natashalief",
    userImg: require("../../assets/Chat/MUA2.jpg"),
    star: <FontAwesome name="star" color="purple" size={12}/>,
    text: '4.6',
    specialty: "Make Up Graduation",
    exp: "5 years",
    about: "Natashalief, seorang MUA berpengalaman selama 5 tahun, adalah ahli tata rias yang mengkhususkan diri dalam makeup untuk acara wisuda. Dengan keahlian yang teruji dan portofolio yang kaya pengalaman, Natashalief mampu menciptakan tampilan makeup yang sesuai dengan gaya dan kepribadian setiap klien. Keberhasilannya tidak hanya tercermin dalam keterampilan seni rias yang tinggi, tetapi juga dalam kemampuannya untuk terus mengikuti tren terbaru dalam industri kecantikan. Dengan dedikasi yang kuat terhadap kepuasan pelanggan dan kualitas pelayanan, Natashalief menjadi pilihan yang luar biasa bagi mereka yang mencari MUA berpengalaman untuk menyempurnakan momen wisuda mereka dengan sentuhan kecantikan yang istimewa.",
    sosmed: "@nathasalief",
  },
  {
    id: "3",
    userName: "Hilga Doui",
    userImg: require("../../assets/Chat/MUA3.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '4.9',
    specialty: "Bold Make Up, Wedding",
    exp: "7 years",
    about: "Hilga Doui, seorang MUA yang berpengalaman selama 7 tahun, membawa keahliannya dalam dunia tata rias dengan fokus utama pada dua bidang yang unik, yaitu makeup bold dan makeup untuk acara pernikahan. Dengan kepiawaiannya dalam menciptakan tampilan yang mencolok dan berani, Hilga Doui tidak hanya menunjukkan keahlian dalam menyelaraskan warna dan konsep makeup bold, tetapi juga memberikan sentuhan keanggunan yang sempurna untuk tata rias pernikahan. Pengalaman selama tujuh tahunnya tidak hanya melibatkan pengembangan keterampilan seni rias, tetapi juga mencerminkan komitmen Hilga Doui untuk terus mengikuti perkembangan terbaru dalam industri kecantikan, memberikan pelayanan terbaik kepada kliennya, dan menciptakan pengalaman tata rias yang tak terlupakan.",
    sosmed: "@HilgaDoui",
  },
  {
    id: "4",
    userName: "Fauziah Hanum",
    userImg: require("../../assets/Chat/MUA4.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '5',
    specialty: "Korean Make Up",
    exp: "6 years",
    about: "Fauziah Hanum, seorang MUA berpengalaman selama 6 tahun, menghadirkan keahlian khususnya dalam menciptakan tampilan makeup dengan gaya Korea yang unik dan trendi. Dengan pengalaman yang luas, Fauziah tidak hanya menjadi ahli dalam menangkap estetika khas Korea, tetapi juga mampu menghadirkan sentuhan pribadi dan inovatif ke dalam setiap tata riasnya. Sebagai seorang profesional kecantikan yang berdedikasi, pengalaman panjangnya mencerminkan komitmennya terhadap pelayanan berkualitas tinggi dan pengetahuan yang mendalam tentang tren terbaru dalam dunia kecantikan Korea. Fauziah Hanum adalah pilihan yang luar biasa bagi mereka yang mencari MUA berpengalaman untuk menciptakan tampilan makeup Korea yang elegan dan menawan.",
    sosmed: "@fauziaahanum",
  },
  {
    id: "5",
    userName: "Ochi Pramita",
    userImg: require("../../assets/Chat/MUA5.jpg"),
    star: <FontAwesome name="star" color="purple" size={12} />,
    text: '4.8',
    specialty: "Thailand Make Up",
    exp: "8 years",
    about: "Ochi Pramita, seorang MUA dengan pengalaman selama 8 tahun, membawa keahlian dan keunikan dalam menciptakan tampilan makeup dengan sentuhan khas Thailand. Dengan fokus pada estetika dan tren kecantikan Thailand, Ochi Pramita tidak hanya menjadi ahli dalam menghadirkan keindahan tradisional Thailand ke dalam tata riasnya, tetapi juga memadukan elemen-elemen modern untuk menciptakan tampilan yang segar dan trendi. Pengalaman panjangnya mencerminkan komitmen Ochi Pramita terhadap pelayanan terbaik dan pemahaman yang mendalam tentang kebutuhan individu. Sebagai seorang profesional kecantikan yang berbakat dan berpengalaman, Ochi Pramita menjadi pilihan ideal bagi mereka yang mencari MUA untuk menciptakan tampilan makeup Thailand yang elegan dan memukau.",
    sosmed: "@ochiipramita",
  },
];

const MUA = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(Data);
  const navigation = useNavigation();

  useEffect(() => {
    // Fungsi untuk melakukan pencarian berdasarkan nama dan specialty
    const searchMUA = () => {
      const lowercasedSearch = search.toLowerCase();
      const filteredMUA = Data.filter(
        (item) =>
          item.userName.toLowerCase().includes(lowercasedSearch) ||
          item.specialty.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredData(filteredMUA);
    };

    // Panggil fungsi searchMUA setiap kali nilai search berubah
    searchMUA();
  }, [search]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Box flex={1}>
        <Box flex={1} pl={5} pr={5} backgroundColor={activeColors.primary}>
          <Center>
            <Box mt={40}>
              {/* Search */}
              <HStack alignItems="center" space={2} p={2} rounded="md">
                <Input
                  placeholder="Search MUA"
                  color={activeColors.tint}
                  placeholderTextColor={activeColors.tint}
                  size="lg"
                  w={"87%"}
                  rounded={12}
                  value={search}
                  onChangeText={(text) => setSearch(text)}
                />
                <Box backgroundColor={"#A01437"} p={2} rounded={6}>
                  <Icon as={Ionicons} name="search" size={6} color={"white"} />
                </Box>
              </HStack>
            </Box>
            <Box mt={4}>
              <FlatList
                data={filteredData} // filteredData untuk menampilkan hasil pencarian
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{ width: "100%" }}>
                    <Box justifyContent={"center"}>
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
                              <Flex
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                              >
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
                                  <HStack alignItems="center" space={2} color={activeColors.tertiary}> 
                                    {item.star}
                                    <Text color={activeColors.tertiary}>{item.text}</Text>
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
                                      about: item.about,
                                      sosmed: item.sosmed,
                                    },
                                  })
                                }
                              >
                                <Text color={activeColors.tertiary} fontWeight={600}>
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
      </Box>
    </TouchableWithoutFeedback>
  );
};

export default MUA;