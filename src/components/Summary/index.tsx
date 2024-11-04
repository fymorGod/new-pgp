import React from 'react';
import { View, Text } from 'react-native';
import { Venda, TipoVenda } from '../../interfaces/Api';
import { styles } from './styles';

interface SummaryProps {
    vendas: Venda[];
}

const formatCurrency = (value: number): string => {
    return `R$ ${value.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
};

export const SummaryComponent: React.FC<SummaryProps> = ({ vendas }) => {

    const subtotal = vendas.reduce((total, venda) => {
        return venda.TIPO !== TipoVenda.DEVOLUCAO ? total + venda.VALOR_LIQUIDO : total;
    }, 0);

    const totalDevolucao = vendas.reduce((total, venda) => {
        return (venda.TIPO === TipoVenda.DEVOLUCAO && venda.FLAG === 1)
            ? total + Math.abs(venda.VALOR_LIQUIDO)
            : total;
    }, 0);

    const total = subtotal - totalDevolucao;

    const percentualDevolucao = subtotal > 0 ? ((totalDevolucao / subtotal) * 100).toFixed(2) : '0.00';
    const percentualSubtotal = subtotal > 0 ? ((subtotal / subtotal) * 100).toFixed(2) : '0.00';
    
    const percentualTotal = total > 0 ? ((total / subtotal) * 100).toFixed(2) : '0.00';

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
                <Text style={styles.value}>{formatCurrency(subtotal)}</Text>
                <Text style={[styles.value, getColorForPercent(percentualSubtotal)]}>
                    {percentualSubtotal}%
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Devolução:</Text>
                <Text style={styles.value}>{formatCurrency(totalDevolucao)}</Text>
                <Text style={[styles.value, getColorForPercent(percentualDevolucao)]}>
                    {percentualDevolucao}%
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.value}>{formatCurrency(total)}</Text>
                <Text style={[styles.value, styles.green]}>{percentualTotal}%</Text>
            </View>
        </View>
    );
};
