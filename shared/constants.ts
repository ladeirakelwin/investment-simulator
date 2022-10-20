export enum IndexingType {
	PRE = 'Pré',
	POS = 'Pós',
	FIXADO = 'Fixado',
}

export enum Performance {
	BRUTO = 'Bruto',
	LIQUIDO = 'Líquido',
}

export const CardText = {
	valorFinalBruto: 'Valor Final Bruto',
	aliquotaIR: 'Alíquota IR',
	valorPagoIR: 'Valor Pago IR',
	valorTotalInvestido: 'Valor Total Investido',
	valorFinalLiquido: 'Valor Final Líquido',
	ganhoLiquido: 'Ganho Líquido',
};

export type CardTextKeys = 'valorFinalBruto' | 'aliquotaIR' | 'valorPagoIR' | 'valorTotalInvestido' | 'valorFinalLiquido' | 'ganhoLiquido';



export const apiParameters = {
	[IndexingType.PRE]: 'pre',
	[IndexingType.POS]: 'pos',
	[IndexingType.FIXADO]: 'ipca',
	[Performance.BRUTO]: 'bruto',
	[Performance.LIQUIDO]: 'liquido',
};
