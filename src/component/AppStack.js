import React, { useState, useEffect, useContext } from "react";

import { Icon, NativeBaseProvider } from "native-base";
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
import RoomChatScreen from "../Screen/RoomChat";
import colors from "./theme";
import { ThemeContext } from "./themeContext";
import HistoryScreen from "../Screen/Profile/Content/History";
import BookedScreen from "../Screen/Booked"; 
import BookedDetail from "../Screen/BookedDetail";
import ArticleDetail from "../Screen/ArticleDetail";
import PesanScreen from "../Screen/Chat";


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
                    options={({ route }) => ({
                        headerShown: true,
                        // headerTitle: "",
                        title: route.params.userName,
                    })}
                    initialParams={{
                        userName: "",
                        userImg: null,
                        // star: "",
                        text: "",
                        specialty: "",                        
                        exp: "",
                        reviews: "",
                    }}
                />   

                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ headerShown: false }}
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
                            initialParams={{
                            image: null,
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
                        headerShown: true,
                        headerTitle: "Booked",
                        headerTitleAlign: "center",
                    }}
                />

                <Stack.Screen
                    name="BookedDetail"
                    component={BookedDetail}
                    options={{
                        headerShown: true,
                        headerTitle: "Booked Detail",
                        headerTitleAlign: "center",
                    }}
                />
                <Stack.Screen
                    name="Chat"
                    component={PesanScreen}
                    options={{
                        headerShown: false,
                        headerTitle: "Booked Detail",
                        headerTitleAlign: "center",
                    }}
                />

                <Stack.Screen
                    name="RoomChat"
                    component={RoomChatScreen}
                    options={({ route }) => ({
                        title: route.params.userName,
                        headerStyle: {
                            backgroundColor: activeColors.primary,
                        },
                        headerTintColor: activeColors.tint,
                        headerTitleAlign: "center",
                    })}
                    initialParams={{ messageText: "", userImg: null }}
                />
            </Stack.Navigator>
        </>
    )
}

export default AppStack;

