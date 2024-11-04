import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { styles } from "./styles";
import { Image } from "react-native";
import Logo from '../../../assets/logo.png';

export const LogoComponent = () => {
    return (
        <LinearGradient
            start={{ x: 0, y: 2 }}
            end={{ x: 1, y: -0.7 }}
            colors={['#ED1C24', '#ec060e', '#760000']}
            style={styles.header}>
            <Animated.View entering={FadeInDown.delay(300)}>
                <Image source={Logo} style={styles.logo} />
                <Animated.Text entering={FadeInRight.delay(400)} style={styles.text}>Flash Vendas</Animated.Text>
            </Animated.View>
        </LinearGradient>
    )
}