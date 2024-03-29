import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, Switch } from "react-native";
import { Box, Text, ScrollView, Image, Flex } from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import colors from "../../component/theme";
import { ThemeContext } from "../../component/themeContext";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SECTIONS = [
  {
    header: "Account",
    icon: "user",
    items: [
      {
        id: "MyProfile",
        icon: "user",
        color: "#32c759",
        label: "My Profile",
        type: "link",
      },
      { 
        id: "ChangePassword",
        icon: "lock",
        color: "#fd2d54",
        label: "Change Password",
        type: "link",
      },
    ],
  },
  {
    header: "Preferences",
    icon: "settings",
    items: [
      {
        id: "darkMode",
        icon: "moon",
        color: "#007afe",
        label: "Dark Mode",
        type: "toogle",
      },
      // {
      //   id: "showCollaborators",
      //   icon: "users",
      //   color: "#32c759",
      //   label: "Show collaborators",
      //   type: "toogle",
      // },
      // {
      //   id: "accessbilityMode",
      //   icon: "airplay",
      //   color: "#fd2d54",
      //   label: "Accesbility mode",
      //   type: "toogle",
      // },
    ],
  },
  {
    header: "Content",
    icon: "align-center",
    items: [
      {
        id: "History",
        icon: "save",
        color: "#32c759",
        label: "History Booked",
        type: "link",
      },
      // { 
      //   icon: "download", 
      //   color: "#fd2d54", 
      //   label: "Downloads", 
      //   type: "link",
      //  },
    ],
  },
  {
    header: "Support",
    icon: "help-circle",
    items: [
      // {
      //   id: "AddAccount",
      //   icon: "users",
      //   color: "#32c759",
      //   label: "Add Account",
      //   type: "link",
      // },
      {
        id: "LogOut",
        icon: "log-out",
        color: "#fd2d54",
        label: "Log out",
      },
    ],
  },
];

const ProfileScreen = () => {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const auth = getAuth();
  
  // const theme = { mode: "light" };
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [form, setForm] = useState({
    darkMode: false,
    wifi: false,
    showCollaborators: true,
    accessibilityMode: false,
  });

  const [isActive, setIsActive] = useState(theme.mode === "dark");
  const toggleDarkMode = () => {
    updateTheme();
    setIsActive((previousState) => !previousState);
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Ambil data dari AsyncStorage saat komponen dipasang (mounted)
    AsyncStorage.getItem("credentials")
      .then((data) => {
        if (data) {
          const credentials = JSON.parse(data);
          setUserData(credentials);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(userData);
  const handleLogout = async () => {
    try {
      // Lakukan logout dari Firebase Authentication
      await signOut(auth);

      // Hapus informasi pengguna yang disimpan di AsyncStorage jika ada
      // await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("credentials");

      // Navigasikan pengguna kembali ke halaman login
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
      // Tampilkan pesan error jika diperlukan
    }
  };



  const sectionsHandler = (id, navigation) => {
    if (id === "MyProfile") {
      navigation.navigate("MyProfile");
    }
    else if (id === "AddAccount") {
      navigation.navigate("Register")
    }
    else if (id === "ChangePassword") {
      navigation.navigate("ResetPassword")
    }
    else if (id === "LogOut") {
      if (theme.mode === "dark") {
        updateTheme();
      }
      setIsActive(false);
      handleLogout();
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView flex={1} backgroundColor={activeColors.primary}>
        <Box paddingY={6}>
          <Box p={6} alignItems={"center"} justifyContent={"center"}>
            <TouchableOpacity onPress={() => {}}>
              <Box position={"relative"}>
                <Image
                  alt="Profile Picture"
                  source={require("../../image/MUA1.jpg")}
                  w={"110"}
                  h={"110"}
                  rounded={99999}
                />

                <Box
                  w={10}
                  h={10}
                  rounded={99999}
                  backgroundColor={"#007bff"}
                  position={"absolute"}
                  right={-1}
                  bottom={-5}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <FeatherIcon name="edit-3" size={15} color="#fff" />
                </Box>
              </Box>
            </TouchableOpacity>

            {userData && (
              <>
                <Text
                  mt={5}
                  fontSize={19}
                  fontWeight={600}
                  color={activeColors.tint}
                  textAlign={"center"}
                >
                  {userData.name}
                </Text>
                <Text
                  mt={2}
                  fontSize={14}
                  fontWeight={400}
                  color={activeColors.tertiary}
                  textAlign={"center"}
                >
                  ID : {userData.id} 
                </Text>
                <Text
                  mt={1}
                  fontSize={15}
                  fontWeight={600}
                  color={activeColors.tertiary}
                  textAlign={"center"}
                >
                  {userData.email}
                </Text>
              </>
            )}
          </Box>

          {SECTIONS.map(({ header, items }) => (
            <Box px={6} key={header}>
              <Text
                py={3}
                fontSize={12}
                fontWeight={600}
                color={"#9e9e9e"}
                textTransform={"uppercase"}
                letterSpacing={1.1}
              >
                {header}
              </Text>

              {items.map(({ id, label, type, icon, color }) => (
                <TouchableOpacity
                  key={icon}
                  onPress={() => sectionsHandler(id, navigation)}
                >
                  <Box
                    alignItems={"center"}
                    justifyContent={"center"}
                    h={12}
                    backgroundColor={activeColors.secondary}
                    rounded={9}
                    mb={3}
                    py={3}
                  >
                    <Flex direction="row" alignItems={"center"} padding={3}>
                      <Box
                        w={8}
                        h={8}
                        rounded={9999}
                        alignItems={"center"}
                        justifyContent={"center"}
                        mr={3}
                        backgroundColor={color}
                      >
                        <FeatherIcon name={icon} color={"#fff"} size={18} />
                      </Box>

                      <Text fontSize={17} color={activeColors.tint}>
                        {label}
                      </Text>

                      <Box flex={1} />

                      {type === "toogle" && (
                        <Switch
                          value={form[id]}
                          onValueChange={(value) => {
                            setForm({ ...form, [id]: value });
                            if (id === "darkMode") {
                              toggleDarkMode();
                            }
                          }}
                        />
                      )}

                      {type === "link" && (
                          <TouchableOpacity
                            onPress={() => {
                              if (id === "MyProfile") {
                                navigation.navigate("MyProfile");
                              } else {
                                // Tindakan lainnya untuk tautan lain
                              }
                            }}
                          >
                            {/* ... */}
                          </TouchableOpacity>
                        ) && (
                          <FeatherIcon
                            name="chevron-right"
                            color={activeColors.tint}
                            size={22}
                          />
                        )}
                    </Flex>
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;