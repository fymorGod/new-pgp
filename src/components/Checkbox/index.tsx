import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import Animated, { FadeInLeft } from 'react-native-reanimated';

interface CustomCheckboxProps {
    label: string;
    isChecked: boolean;
    onToggle: () => void;
}

export const CustomCheckbox = ({ label, isChecked, onToggle }: CustomCheckboxProps) => (
    <Animated.View entering={FadeInLeft.delay(400)}>
        <Pressable onPress={onToggle} style={styles.checkboxContainer}>
            <MaterialIcons
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#ec060e"
            />
            <Text style={styles.checkboxLabel}>{label}</Text>
        </Pressable>
    </Animated.View>
);
