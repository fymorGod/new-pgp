import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { SimpleLineIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { FilterComponent } from "../../components/Filter";
import { DateComponent } from "../../components/Date";
import Collapsible from "react-native-collapsible";
import Icon from "react-native-vector-icons/FontAwesome";
import type { ApiResponse, Devolucao, Venda } from "../../interfaces/Api";
import { filiais } from "../../db/filiais";
import { api } from "../../api/app";
import { SummaryComponent } from "../../components/Summary";

export const HomePage = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [iconFilterCondition, setIconFilterCondition] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const handleAccordionToggle = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    useEffect(() => {
        const buscarVenda = async () => {
            setLoading(true);
            const response = await api.get<ApiResponse>('/wsflash.php?dtfim=2024-11-01T20:13:43.785Z&dtini=2024-11-01T20:13:43.785Z&empresa=p&filiais=101,102,106,107,109,110,111,112,114,115');
            if (response.data.flag) {
                setLoading(false
                );
                setApiResponse(response.data);
                setIconFilterCondition(false);
            }
        };
        buscarVenda();
    }, []);
    const renderAccordionContent = (vendas: Venda[], devolucoes: Devolucao[]) => {
        // Calcula o total líquido das vendas
        const totalValorLiquido = vendas.reduce((total, venda) => total + venda.VALOR_LIQUIDO, 0);

        // Calcula o total de devoluções onde FLAG é 1
        const totalDevolucao = devolucoes.reduce((total, devolucao) => {
            return devolucao.FLAG === 1 ? total + devolucao.DEVOLUCAO : total;
        }, 0);

        // Calcula o total considerando as devoluções
        const totalComDevolucao = totalValorLiquido - totalDevolucao;

        return (
            <View style={styles.contentContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Tipo</Text>
                    <Text style={styles.tableHeaderText}>Valor Líq.</Text>
                    <Text style={styles.tableHeaderText}>%</Text>
                    <Text style={styles.tableHeaderText}>Devol.</Text>
                </View>

                {vendas.map((venda, index) => {
                    const percentual = totalValorLiquido > 0
                        ? ((venda.VALOR_LIQUIDO / totalValorLiquido) * 100).toFixed(2)
                        : '0.00';

                    const devolucao = devolucoes.find((dev) => dev.FILIAL === venda.FILIAL && dev.FLAG === 1)?.DEVOLUCAO || 0;

                    return (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableRowText}>{venda.TIPO}</Text>
                            <Text style={styles.tableRowText}>R$ {venda.VALOR_LIQUIDO.toFixed(2)}</Text>
                            <Text style={styles.tableRowText}>{percentual}%</Text>
                            <Text style={styles.tableRowText}>R$ {devolucao.toFixed(2)}</Text>
                        </View>
                    );
                })}

                <View style={styles.tableTotalRow}>
                    <Text style={styles.tableTotalText}>Total</Text>
                    <Text style={styles.tableTotalText}>R$ {totalComDevolucao.toFixed(2)}</Text>
                    <Text style={styles.tableTotalText}>
                        {totalValorLiquido > 0 ? '100%' : '0%'}
                    </Text>
                    <Text style={styles.tableTotalText}></Text>
                </View>
            </View>
        );
    };

    const getVendasPorFilial = () => {
        if (apiResponse?.data?.vendas) {
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

    const getDevolucoesPorFilial = () => {
        if (apiResponse?.data?.devolucoes) {
            const devolucoesAgrupadas: { [key: number]: Devolucao[] } = {};
            apiResponse.data.devolucoes.forEach((devolucao) => {
                if (!devolucoesAgrupadas[devolucao.FILIAL]) {
                    devolucoesAgrupadas[devolucao.FILIAL] = [];
                }
                devolucoesAgrupadas[devolucao.FILIAL].push(devolucao);
            });
            return devolucoesAgrupadas;
        }
        return {};
    };

    const vendasAgrupadas = getVendasPorFilial();
    const devolucoesAgrupadas = getDevolucoesPorFilial();

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
                        <Text style={styles.title}>Flash de vendas</Text>
                        <SimpleLineIcons name={'logout'} size={28} style={styles.iconRight} />
                    </LinearGradient>
                    <View style={styles.boxInfo}>
                        <Text style={styles.infoText}>| Vendas</Text>
                        <FilterComponent iconFilterCondition={iconFilterCondition} setIconFilterCondition={setIconFilterCondition} />
                    </View>
                    {!iconFilterCondition && apiResponse && apiResponse.data ? (
                        <SummaryComponent
                            vendas={apiResponse.data.vendas}
                            devolucoes={apiResponse.data.devolucoes}
                        />
                    ) : null}
                    <View>
                        {iconFilterCondition ? (
                            <DateComponent setData={setApiResponse} setState={setIconFilterCondition} />
                        ) : (
                            <ScrollView style={styles.list}>
                                {Object.keys(vendasAgrupadas).map((filialId) => {
                                    const id = parseInt(filialId);
                                    const isExpanded = activeAccordion === id;
                                    const vendas = vendasAgrupadas[id];
                                    const devolucoes = devolucoesAgrupadas[id] || [];

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
                                                {renderAccordionContent(vendas, devolucoes)}
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
