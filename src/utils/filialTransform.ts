import { filiais } from "../db/filiais";

// Transformando a constante em um array para a lista
export const filialData = Object.keys(filiais).map((key) => ({
    id: parseInt(key),
    nome: filiais[parseInt(key)],
  }));
  