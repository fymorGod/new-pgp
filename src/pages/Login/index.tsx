import React, { useContext } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { styles } from "./styles";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import * as Application from 'expo-application';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../router/RootNavigator";

type FormData = {
    username: string;
    password: string;
}

export const LoginPage = () => {
    const mode = 'login';
    const { setToken, setUser, setAuthenticated } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const { handleSubmit, control, formState: { errors } } = useForm<FormData>();

    const appVersion = Application.nativeApplicationVersion || '1.0';

    // const login = async (data: FormData) => {
    //         const res = await axios.post("https://api.apotiguar.com.br:64462", {
    //             mode: mode,
    //             username: data.username,
    //             password: data.password
    //         });
    //         if (res.data.flag) {
    //             setAuthenticated("authenticate");
    //             setToken(res.data.data.token);
    //             setUser({
    //                 lojaInfo: res.data.data.store_name,
    //                 storeCode: res.data.data.store_code,
    //                 username: res.data.data.username,
    //                 permission: res.data.data.permissions
    //             });
    //             navigation.navigate("Home");
    //         } else {
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Usuário ou senha incorretos',
    //                 visibilityTime: 5000
    //             });
    //         }
    //     }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <View style={styles.container}>
            <Text>Login</Text>
        </View>
    )
}
