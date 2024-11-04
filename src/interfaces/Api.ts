
export enum TipoVenda {
    PRODUTOS = "PRODUTOS",
    ECOMMERCE = "ECOMMERCE",
    BRASIL_ATACADO = "BRASIL_ATACADO",
    DEVOLUCAO = "DEVOLUÇÃO"
}

export interface Venda {
    FILIAL: number;
    TIPO: TipoVenda; 
    FLAG?: number;
    VALOR_LIQUIDO: number;
}

export interface ApiResponse {
    flag: boolean;
    data: Venda[]; 
}
