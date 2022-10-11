import { IndexingType, Performance } from './constants';

export type Data = {
	initial: string | undefined;
	due: string | undefined;
	ipca: string | undefined;
	monthly: string | undefined;
	profitability: string | undefined;
	cdi: string | undefined;
	performance: Performance;
	indexing: IndexingType;
};

export interface Simulations {
	tipoIndexacao: string;
	tipoRendimento: string;
	valorFinalBruto: number;
	aliquotaIR: number;
	valorPagoIR: number;
	valorTotalInvestido: number;
	valorFinalLiquido: number;
	ganhoLiquido: number;
	graficoValores: GraphValues;
}

export interface GraphValues {
	comAporte: { [key: string]: number };
	semAporte: { [key: string]: number };
}
