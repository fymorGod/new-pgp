import React, { useContext, useState } from "react";
import { Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../router/RootNavigator";
import { LogoComponent } from "../../components/LogoComponent";
import Animated, { BounceInLeft, FadeInDown, FadeInRight } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from "expo-linear-gradient";
import { AppVersion } from "../../components/AppVersion";
import axios from "axios";
import { ActivityIndicator } from "react-native";

type FormData = {
    username: string;
    password: string;
}
interface LoginResponse {
    flag: boolean;
    data: {
        token: string;
        store_name: string;
        store_code: string;
        username: string;
        permissions: Permissions;
    };
}

export const LoginPage = () => {
    const mode = 'login';
    const { setToken, setUser, setAuthenticated } = useContext(AuthContext);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const { handleSubmit, control, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const login = async (data: FormData) => {
        setLoading(true)
        const res = await axios.post<any>("https://api.apotiguar.com.br:64462", {
            mode: mode,
            username: data.username,
            password: data.password
        });
        if (res.data.flag) {
            console.log("Hello world")
            setAuthenticated("authenticate");
            setLoading(false)
            setToken(res.data.data.token);
            setUser({
                lojaInfo: res.data.data.store_name,
                storeCode: res.data.data.store_code,
                username: res.data.data.username,
                permission: res.data.data.permissions
            });
            navigation.navigate("Home");
        } else {
            Toast.show({
                type: 'error',
                text1: 'Usuário ou senha incorretos',
                visibilityTime: 5000
            });
        }
    }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={[styles.container, { backgroundColor: 'transparent' }]}>
                {
                    loading ?
                        (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#ffffff" />
                                <Text style={styles.loadingText}>Verificando os dados...</Text>
                            </View>
                        ) :
                        (
                            <View style={styles.main}>
                                <LogoComponent />
                                <Animated.View entering={FadeInRight.delay(300)} style={{ justifyContent: 'center' }}>
                                    <Animated.View entering={BounceInLeft.delay(300)} style={styles.formContainer}>
                                        <Text style={styles.title}>Login</Text>
                                        <View style={styles.inputContainer}>
                                            <Icon name="user-o" size={20} color="#ec060e" style={styles.iconLeft} />
                                            <Controller
                                                control={control}
                                                name="username"
                                                rules={{ required: "Username obrigatório" }}
                                                render={({ field: { value, onChange } }) => (
                                                    <View style={styles.inputContainer}>
                                                        {errors.username && (
                                                            <Text style={styles.errorText}>{errors.username.message}</Text>
                                                        )}
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder="Username"
                                                            autoCapitalize='none'
                                                            onChangeText={onChange}
                                                            value={value}
                                                            onFocus={() => setIsInputFocused(true)}
                                                            onBlur={() => setIsInputFocused(false)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                )}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <Icon name="unlock-alt" size={20} color="#ec060e" style={styles.iconLeft} />
                                            <Controller
                                                control={control}
                                                name="password"
                                                rules={{ required: "Password obrigatório" }}
                                                render={({ field: { value, onChange } }) => (
                                                    <View style={styles.inputContainer}>
                                                        {errors.password && (
                                                            <Text style={styles.errorText}>{errors.password.message}</Text>
                                                        )}
                                                        <TextInput
                                                            style={styles.input}
                                                            placeholder="Password"
                                                            autoCapitalize='none'
                                                            onChangeText={onChange}
                                                            secureTextEntry
                                                            value={value}
                                                            onFocus={() => setIsInputFocused(true)}
                                                            onBlur={() => setIsInputFocused(false)}
                                                            underlineColorAndroid="transparent"
                                                        />
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </Animated.View>
                                </Animated.View>
                                {!isInputFocused && (
                                    <Animated.View entering={FadeInDown.delay(400)} style={styles.footerContainer}>
                                        <LinearGradient
                                            colors={['#ED1C24', '#ec060e', '#760000']}
                                            start={{ x: 0, y: 2 }}
                                            end={{ x: 1, y: -2 }}
                                            style={styles.btnBuscar}>
                                            <TouchableOpacity onPress={handleSubmit(login)}>
                                                <Text style={styles.textBuscar}>Entrar</Text>
                                            </TouchableOpacity>
                                        </LinearGradient>
                                        <AppVersion />
                                    </Animated.View>
                                )}
                            </View>
                        )
                }

            </View>
        </TouchableWithoutFeedback>
    )
}
