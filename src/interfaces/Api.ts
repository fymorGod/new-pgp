export interface ApiResponse {
    flag: boolean;
    data: {
        vendas: Venda[];
        devolucoes: Devolucao[];
    };
}

export interface Venda {
    FILIAL: number;
    TIPO: string;
    VALOR_LIQUIDO: number;
}

interface Devolucao {
    FILIAL: number;
    FLAG: number;
    DEVOLUCAO: number;
}