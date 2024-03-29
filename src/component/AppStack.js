import React, { useState, useEffect, useContext } from "react";
import { Icon, NativeBaseProvider, Box } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import MenuBar from "./MenuBar";
import WelcomeScreen from "../Screen/Welcome";
import LoginScreen from "../Screen/Profile/Auth/Login";
import RegisterScreen from "../Screen/Profile/Auth/Register";
import ForgotPasswordScreen from "../Screen/Profile/Auth/Forgot";
import MyProfileScreen from "../Screen/Profile/Account/MyProfile";
import ResetPasswordScreen from "../Screen/Profile/Account/ResetPassword";
import MUADetails from "../Screen/MUADetail";
import colors from "./theme";
import { ThemeContext } from "./themeContext";
import BookedScreen from "../Screen/Booked"; 
import BookedDetail from "../Screen/BookedDetail";
import ScheduleDetail from "../Screen/ScheduleDetail";
import ArticleDetail from "../Screen/ArticleDetail";
import RecomendationDetail from "../Screen/DetailRecomendation";

const Stack = createStackNavigator();


const AppStack = () => {

    const { theme } = useContext(ThemeContext);
    let activeColors = colors[theme.mode];

    return (
        <>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="MUADetails"
                    component={MUADetails}
                    options={{
                        headerTitle: "MUA Detail",
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    }}
                    initialParams={{
                        userName: null,
                        userImg: "",
                        text: "",
                        specialty: "",                        
                        exp: "",
                        reviews: "",
                    }}
                />   

                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="ForgotPass"
                    component={ForgotPasswordScreen}
                    options={({ navigation }) => ({
                        headerTitle: "",
                        headerTitleAlign: "center",
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon
                                    as={Ionicons}
                                    name="chevron-back-outline"
                                    size={7}
                                    ml={3}
                                    color="black"
                                />
                            </TouchableOpacity>
                        ),
                    })}
                />

                <Stack.Screen
                    name="Tabs"
                    component={MenuBar}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                        name="ArticleDetail"
                        component={ArticleDetail}
                        options={({ route }) => ({
                            title: route.params.title,
                            headerShown: true,
                            headerTitle: "Article Detail", // Menggunakan judul dari parameter rute
                            headerTitleAlign: "center",
                        })}
                            initialParams={{ //menetapkan nilai awal, menghindari undefined
                            image: "",
                            title: "",
                            content: "",
                        }}
                />

                <Stack.Screen
                        name="DetailRecomendation"
                        component={RecomendationDetail}
                        options={({ route }) => ({
                            title: route.params.title,
                            headerShown: true,
                            headerTitle: "Recomendation Detail", // Menggunakan judul dari parameter rute
                            headerTitleAlign: "center",
                        })}
                            initialParams={{ //menetapkan nilai awal, menghindari undefined
                            image: "",
                            title: "",
                            content: "",
                        }}
                />

                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    }}
                    name="MyProfile"
                    component={MyProfileScreen}
                />

                <Stack.Screen
                    options={{
                        headerTitle: "Reset Password",
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    }}
                    name="ResetPassword"
                    component={ResetPasswordScreen}
                />

                <Stack.Screen
                    name="Booked"
                    component={BookedScreen}
                    options={{
                        headerShown: false,
                        headerTitle: "Booked",
                        headerTitleAlign: "center",
                    }}
                />

                <Stack.Screen
                    name="BookedDetail"
                    component={BookedDetail}
                    options={{
                        headerLeft: null, // Menyembunyikan tombol back
                        headerTitle: "Booked Detail",
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    }}
                />

                <Stack.Screen
                    name="ScheduleDetail"
                    component={ScheduleDetail}
                    options={{ 
                        headerLeft: null, // Menyembunyikan tombol back
                        headerTitle: "Schedule Detail",
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    }}
                />

            </Stack.Navigator>
        </>
    )
}

export default AppStack;