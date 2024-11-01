import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
};

export const RootNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false, animation: 'slide_from_right'}} />
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false, animation: 'slide_from_right'}} />
        </Stack.Navigator>
    )
}