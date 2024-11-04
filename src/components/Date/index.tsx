import { ActivityIndicator, Button, Platform, Pressable, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { useContext, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomCheckbox } from '../Checkbox';
import { LinearGradient } from "expo-linear-gradient";
import type { ApiResponse } from "../../interfaces/Api";
import { api } from "../../api/app";
import { AuthContext } from "../../context/AuthContext";
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from "react-native-reanimated";

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
    const [selectAll, setSelectAll] = useState(false);
    const { token } = useContext(AuthContext)
    const toggleFilial = (filial: string) => {
        setSelectedFiliais((prev) => ({ ...prev, [filial]: !prev[filial] }));
    };
    const toggleSelectAll = () => {
        const newState = !selectAll;
        const updatedFiliais = Object.keys(selectedFiliais).reduce((acc, key) => ({ ...acc, [key]: newState }), {});
        setSelectedFiliais(updatedFiliais);
        setSelectAll(newState);
    };
    const handleStartDateChange = (event: any, date?: Date) => {
        setShowStartPicker(false);
        if (date) {

            date.setHours(0, 0, 0, 0);
            setStartDate(date);
        }
    };

    const handleEndDateChange = (event: any, date?: Date) => {
        setShowEndPicker(false);
        if (date) {
            date.setHours(0, 0, 0, 0);
            setEndDate(date);
        }
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
        console.log(filialIDs)

        try {
            const response = await api.get<ApiResponse>(
                `/?mode=flash&empresa=p&filiais=${filialIDs}&dtini=${startDate.toISOString()}&dtfim=${endDate.toISOString()}&token=${token}&app_id=e03ad982449af87ade1899ffbc259eee`
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
            <Animated.View entering={FadeInDown.delay(200)} style={styles.filterContainer}>
                <Pressable onPress={() => setShowStartPicker(!showStartPicker)} style={styles.dateButton}>
                    <Text style={styles.textData}>
                        Data Inicial: {new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(startDate)}
                    </Text>
                </Pressable>
                {showStartPicker && (
                    <Animated.View entering={FadeInUp.delay(150)}>
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={handleStartDateChange}
                        />
                        {/* {Platform.OS === 'ios' && (
                            <Button title="Confirmar" onPress={() => setShowStartPicker(!showStartPicker)} />
                        )} */}
                    </Animated.View>
                )}

                <Pressable onPress={() => setShowEndPicker(!showEndPicker)} style={styles.dateButton}>
                    <Text style={styles.textData}>
                        Data final: {new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(endDate)}
                    </Text>
                </Pressable>
                {showEndPicker && (
                    <Animated.View entering={FadeInUp.delay(150)}>
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onChange={handleEndDateChange}
                        />
                        {/* {Platform.OS === 'ios' && (
                            <Button title="Confirmar" onPress={() => setShowEndPicker(!showEndPicker)} />
                        )} */}
                    </Animated.View>
                )}
                <CustomCheckbox
                    label="Marcar todos"
                    isChecked={selectAll}
                    onToggle={toggleSelectAll}
                />

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
                        <Animated.Text entering={FadeInLeft.delay(300)} style={styles.btnTextBuscar}>Buscar</Animated.Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}