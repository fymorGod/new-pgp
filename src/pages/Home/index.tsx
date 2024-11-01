import React, { useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { FilterComponent } from "../../components/Filter";
import { DateComponent } from "../../components/Date";
import { filialData } from "../../utils/filialTransform";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import type { ApiResponse, Venda } from "../../interfaces/Api";
import { filiais } from "../../db/filiais";

export const HomePage = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [iconFilterCondition, setIconFilterCondition] = useState(false)

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const handleAccordionToggle = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    const renderAccordionContent = (vendas: Venda[]) => (
        <View style={styles.contentContainer}>
            {vendas.map((venda, index) => (
                <Text key={index} style={styles.contentText}>
                    Tipo: {venda.TIPO}, Valor Líquido: {venda.VALOR_LIQUIDO.toFixed(2)}
                </Text>
            ))}
        </View>
    );
    const getVendasPorFilial = () => {
        if (apiResponse && apiResponse.data.vendas) {
            // Agrupa vendas por FILIAL
            const vendasAgrupadas: { [key: number]: Venda[] } = {};
            apiResponse.data.vendas.forEach((venda) => {
                if (!vendasAgrupadas[venda.FILIAL]) {
                    vendasAgrupadas[venda.FILIAL] = [];
                }
                vendasAgrupadas[venda.FILIAL].push(venda);
            });
            return vendasAgrupadas;
        }
        return {};
    };

    const vendasAgrupadas = getVendasPorFilial();

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 2 }}
                end={{ x: 1, y: -0.7 }}
                colors={['#ED1C24', '#ec060e', '#760000']}
                style={styles.header}
            >
                {/* <AntDesign name={'menufold'} size={28} style={styles.iconLeft} /> */}
                <Text style={styles.title}>Flash de vendas</Text>
                <SimpleLineIcons name={'logout'} size={28} style={styles.iconRight} />
            </LinearGradient>
            <View style={styles.boxInfo}>
                <Text style={styles.infoText}>| Vendas</Text>
                <FilterComponent iconFilterCondition={iconFilterCondition} setIconFilterCondition={setIconFilterCondition} />
            </View>
            <View>
                {iconFilterCondition && (
                    <DateComponent setData={setApiResponse} setState={setIconFilterCondition}/>
                )}
            </View>
            <>
                {
                    !iconFilterCondition && (
                        <ScrollView style={styles.list}>
                        {Object.keys(vendasAgrupadas).map((filialId) => {
                            const id = parseInt(filialId);
                            const isExpanded = activeAccordion === id;
                            return (
                                <View key={id} style={styles.itemContainer}>
                                    <TouchableOpacity style={styles.itemRow} onPress={() => handleAccordionToggle(id)}>
                                        <Text style={styles.itemText}>{filiais[id]}</Text>
                                        <Icon
                                            name={isExpanded ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color="#ec060e"
                                        />
                                    </TouchableOpacity>
                                    <Collapsible collapsed={!isExpanded}>
                                        {renderAccordionContent(vendasAgrupadas[id])}
                                    </Collapsible>
                                </View>
                            );
                        })}
                    </ScrollView>
                    )
                }
            </>
        </View>
    );
};
