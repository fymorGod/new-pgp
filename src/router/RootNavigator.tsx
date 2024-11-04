import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "../pages/Login";
import { HomePage } from "../pages/Home";
import { AuthContext } from "../context/AuthContext";

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
};

export const RootNavigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const { authenticated, token } = useContext(AuthContext);

    return (
        <Stack.Navigator>
            {authenticated && token ? (
                <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false, animation: 'slide_from_right'}} />
            ) : (
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false, animation: 'slide_from_right'}} />
            ) 
        }
        </Stack.Navigator>
    );
};