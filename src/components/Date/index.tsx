import { ActivityIndicator, Pressable, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import { CustomCheckbox } from '../Checkbox';
import { LinearGradient } from "expo-linear-gradient";
import type { ApiResponse } from "../../interfaces/Api";
import { api } from "../../api/app";

interface DateComponentProps {
    setData: (value: ApiResponse) => void;
    setState: (value: boolean) => void;
}

export const DateComponent = ({ setData, setState }: DateComponentProps) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [selectedFiliais, setSelectedFiliais] = useState<{ [key: string]: boolean }>({
        Centro: false,
        Cohama: false,
        Forquilha: false,
        Cohafuma: false,
        Imperatriz: false,
        Africanos: false,
        Bacabal: false,
        OlhoDagua: false,
        SantaInes: false,
        Maiobao: false,
    });

    const toggleFilial = (filial: string) => {
        setSelectedFiliais((prev) => ({ ...prev, [filial]: !prev[filial] }));
    };

    const handleStartDateChange = (event: any, date?: Date) => {
        setShowStartPicker(false);
        if (date) setStartDate(date);
    };

    const handleEndDateChange = (event: any, date?: Date) => {
        setShowEndPicker(false);
        if (date) setEndDate(date);
    };

    const buscarVenda = async () => {
        setLoading(true)
        const response = await api.get<ApiResponse>('/wsflash.php?dtfim=2024-11-01T20:13:43.785Z&dtini=2024-11-01T20:13:43.785Z&empresa=p&filiais=101,102,107,112');
        if (response.data.flag) {
            setLoading(true)
            setData(response.data);
            setState(false)
        }
    };

    return (
        <>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            )}
            <View style={styles.filterContainer}>
                <Pressable onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
                    <Text>Data Inicial: {startDate.toISOString()}</Text>
                </Pressable>
                {showStartPicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleStartDateChange}
                    />
                )}

                <Pressable onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
                    <Text>Data Final: {endDate.toISOString()}</Text>
                </Pressable>
                {showEndPicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={handleEndDateChange}
                    />
                )}

                {Object.keys(selectedFiliais).map((filial) => (
                    <CustomCheckbox
                        key={filial}
                        label={filial}
                        isChecked={selectedFiliais[filial]}
                        onToggle={() => toggleFilial(filial)}
                    />
                ))}
                <TouchableOpacity onPress={() => buscarVenda()}>
                    <LinearGradient
                        start={{ x: 0, y: 2 }}
                        end={{ x: 1, y: -0.7 }}
                        colors={['#ED1C24', '#ec060e', '#760000']}
                        style={styles.btnBuscar}
                    >
                        <Text style={styles.btnTextBuscar}>Buscar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
}