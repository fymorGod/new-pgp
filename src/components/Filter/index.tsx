import React from 'react';
import { View, Text, Pressable } from 'react-native';


import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';

interface FilterProps {
    setIconFilterCondition: (value: boolean) => void;
    iconFilterCondition: boolean
}

export const FilterComponent = ({ iconFilterCondition, setIconFilterCondition}: FilterProps) => {
    return (
        <View>
            <Pressable onPress={() => setIconFilterCondition(!iconFilterCondition)} style={styles.boxFilter}>
                <Text style={styles.btnFilter}>Filtro</Text>
                <MaterialIcons name={iconFilterCondition ? 'filter-alt' : 'filter-alt-off'} size={28} style={styles.iconFilter} />
            </Pressable>
        </View>
    );
};
