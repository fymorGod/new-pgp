import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { FilterComponent } from "../../components/Filter";
import { DateComponent } from "../../components/Date";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import type { ApiResponse, Venda } from "../../interfaces/Api";
import { filiais } from "../../db/filiais";
import { api } from "../../api/app";
import { SummaryComponent } from "../../components/Summary";
import { RenderAccordionContent } from "../../components/Accordion";
import { AuthContext } from "../../context/AuthContext";
import { formatCurrency } from "../../pipes/formatterCashValue";

export const HomePage = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [iconFilterCondition, setIconFilterCondition] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const startDate = new Date();
    const endDate = new Date();

    const { logout, token } = useContext(AuthContext);

    const handleAccordionToggle = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    useEffect(() => {
        const buscarVenda = async () => {
            setLoading(true);
            try {
                const response = await api.get<ApiResponse>(`?mode=flash&empresa=p&filiais=101,102,106,107,109,110,111,112,114,115&dtini=${startDate}&dtfim=${endDate}&token=${token}&app_id=e03ad982449af87ade1899ffbc259eee`);
                if (response.data.flag) {
                    setApiResponse(response.data);
                    setIconFilterCondition(false);
                }
            } catch (error) {
                console.error("Erro ao buscar as vendas:", error);
            } finally {
                setLoading(false);
            }
        };
        buscarVenda();
    }, []);


    const getVendasPorFilial = () => {
        const vendasAgrupadas: { [key: number]: Venda[] } = {};
        if (apiResponse?.data) {
            apiResponse.data.forEach((venda) => {
                if (!vendasAgrupadas[venda.FILIAL]) {
                    vendasAgrupadas[venda.FILIAL] = [];
                }
                vendasAgrupadas[venda.FILIAL].push(venda);
            });
        }
        return vendasAgrupadas;
    };

    const vendasAgrupadas = getVendasPorFilial();

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                <>
                    <LinearGradient
                        start={{ x: 0, y: 2 }}
                        end={{ x: 1, y: -0.7 }}
                        colors={['#ED1C24', '#ec060e', '#760000']}
                        style={styles.header}
                    >
                        <SimpleLineIcons name={'logout'} size={28} style={styles.iconRight} onPress={logout} />
                        <Text style={styles.title}>Flash de vendas</Text>
                        <SimpleLineIcons name={'logout'} size={28} style={styles.iconRight} onPress={logout} />
                    </LinearGradient>
                    <View style={styles.boxInfo}>
                        <Text style={styles.infoText}>Vendas</Text>
                        <FilterComponent iconFilterCondition={iconFilterCondition} setIconFilterCondition={setIconFilterCondition} />
                    </View>
                    {!iconFilterCondition && apiResponse && apiResponse.data ? (
                        <SummaryComponent vendas={apiResponse.data} />
                    ) : null}
                    <View style={{ flex: 1 }}>
                        {iconFilterCondition ? (
                            <DateComponent setData={setApiResponse} setState={setIconFilterCondition} />
                        ) : (
                            <ScrollView style={styles.list}>
                                {Object.keys(vendasAgrupadas).map((filialId) => {
                                    const id = parseInt(filialId);
                                    const isExpanded = activeAccordion === id;
                                    const vendas = vendasAgrupadas[id] || [];

                                    const totalValorLiquido = vendas.reduce((total, venda) => {

                                        if (venda.TIPO !== "DEVOLUÇÃO") {
                                            return total + venda.VALOR_LIQUIDO;
                                        }
                                        return total;
                                    }, 0);

                                    const totalDevolucao = vendas.reduce((total, venda) => {
                                        if (venda.TIPO === "DEVOLUÇÃO" && venda.FLAG === 1) {
                                            return total + Math.abs(venda.VALOR_LIQUIDO);
                                        }
                                        return total;
                                    }, 0);

                                    const total = totalValorLiquido - totalDevolucao;

                                    return (
                                        <View key={id} style={styles.itemContainer}>
                                            <TouchableOpacity style={styles.itemRow} onPress={() => handleAccordionToggle(id)}>
                                                <Text style={styles.itemTextLeft}>{filiais[id]}</Text>
                                                <Text style={styles.itemTextRight}>{formatCurrency(total)}</Text>
                                                <Icon
                                                    name={isExpanded ? "chevron-up" : "chevron-down"}
                                                    size={20}
                                                    color="#ec060e"
                                                    style={styles.iconStyle}
                                                />
                                            </TouchableOpacity>
                                            <Collapsible collapsed={!isExpanded}>
                                                <RenderAccordionContent vendas={vendas} />
                                            </Collapsible>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </View>
                </>
            )}
        </View>
    );
};
