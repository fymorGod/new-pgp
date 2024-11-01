import { ActivityIndicator, Platform, Pressable, Text, TouchableOpacity, View } from "react-native"
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
        setLoading(true);
        
        const filialIDs = Object.keys(selectedFiliais)
            .filter((filial) => selectedFiliais[filial])
            .map((filial) => {
                switch (filial) {
                    case "Centro": return 101;
                    case "Cohama": return 102;
                    case "Forquilha": return 106;
                    case "Cohafuma": return 107;
                    case "Imperatriz": return 109;
                    case "Africanos": return 110;
                    case "Bacabal": return 111;
                    case "OlhoDagua": return 112;
                    case "SantaInes": return 114;
                    case "Maiobao": return 115;
                    default: return null;
                }
            })
            .filter((id) => id !== null)
            .join(',');

        try {
            const response = await api.get<ApiResponse>(
                `/wsflash.php?dtfim=${endDate.toISOString()}&dtini=${startDate.toISOString()}&empresa=p&filiais=${filialIDs}`
            );
            if (response.data.flag) {
                setData(response.data);
                setState(false);
            }
        } finally {
            setLoading(false);
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
                        display={Platform.OS === "ios" ? "spinner" : "default"}
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
                        display={Platform.OS === "ios" ? "spinner" : "default"}
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