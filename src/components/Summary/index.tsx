import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Venda, Devolucao } from '../../interfaces/Api';
import { styles } from './styles';

interface SummaryProps {
    vendas: Venda[];
    devolucoes: Devolucao[];
}

export const SummaryComponent: React.FC<SummaryProps> = ({ vendas, devolucoes }) => {
    const totalValorLiquido = vendas.reduce((total, venda) => total + venda.VALOR_LIQUIDO, 0);
    const totalDevolucao = devolucoes.reduce((total, devolucao) => {
        return devolucao.FLAG === 1 ? total + devolucao.DEVOLUCAO : total;
    }, 0);

    const totalComDevolucao = totalValorLiquido - totalDevolucao;

    const percentualSubtotal = totalValorLiquido > 0 ? ((totalComDevolucao / totalValorLiquido) * 100).toFixed(2) : '0.00';
    
    const percentualDevolucao = totalValorLiquido > 0 ? ((totalDevolucao / totalValorLiquido) * 100).toFixed(2) : '0.00';
    
    const percentualTotal = '100.00';
    const getColorForPercent = (percent: string) => {
        const percentValue = parseFloat(percent);
        if (percentValue < 40) return styles.red;
        if (percentValue >= 40 && percentValue <= 50) return styles.yellow; 
        return styles.green; 
    };
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
            <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>
                    {totalComDevolucao.toFixed(2)} R$
                </Text>
                <Text style={[styles.value, getColorForPercent(percentualSubtotal)]}>
                    {percentualSubtotal}%
                </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.label}>Devolução:</Text>
                <Text style={styles.value}>
                    {totalDevolucao.toFixed(2)} R$
                </Text>
                <Text style={[styles.value, getColorForPercent(percentualDevolucao)]}>
                    {percentualDevolucao}%
                </Text>
            </View>
            <View style={styles.infoContainer}>
            <Text style={styles.label}>Total:</Text>
                <Text style={styles.value}>
                    {totalValorLiquido.toFixed(2)} R$
                </Text>
                <Text style={[styles.value, styles.green]}>
                    {percentualTotal}%
                </Text>
            </View>
        </View>
    );
};
