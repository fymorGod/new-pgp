import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import type { Venda } from "../../interfaces/Api";

interface AccordionProps {
    vendas: Venda[];
}

const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

export const RenderAccordionContent = ({ vendas }: AccordionProps) => {
  
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

    const vendasPorTipo = vendas.reduce((acc, venda) => {
        if (venda.TIPO !== "DEVOLUÇÃO") {
            acc[venda.TIPO] = (acc[venda.TIPO] || 0) + venda.VALOR_LIQUIDO;
        }
        return acc;
    }, {} as { [key: string]: number });

    return (
        <View style={styles.contentContainer}>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Tipo</Text>
                <Text style={styles.tableHeaderText}>Valor Líq.</Text>
                <Text style={styles.tableHeaderText}>%</Text>
            </View>

            {Object.entries(vendasPorTipo).map(([tipo, valor], index) => {
                const percentual = totalValorLiquido > 0
                    ? ((valor / totalValorLiquido) * 100).toFixed(2)
                    : '0.00';

                return (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>{tipo}</Text>
                        <Text style={styles.tableRowText}>{formatCurrency(valor)}</Text>
                        <Text style={styles.tableRowText}>{percentual}%</Text>
                    </View>
                );
            })}

            {totalDevolucao !== 0 && (
                <View style={styles.tableRow}>
                    <Text style={styles.tableRowText}>DEVOLUÇÃO</Text>
                    <Text style={styles.tableRowText}>{formatCurrency(totalDevolucao)}</Text>
                    <Text style={styles.tableRowText}>
                        {totalValorLiquido > 0 ? ((totalDevolucao / totalValorLiquido) * 100).toFixed(2) : '0.00'}%
                    </Text>
                </View>
            )}

            <View style={styles.tableTotalRow}>
                <Text style={styles.tableTotalText}>Total</Text>
                <Text style={styles.tableTotalText}>{formatCurrency(total)}</Text>
                <Text style={styles.tableTotalText}>100%</Text>
            </View>
        </View>
    );
};
