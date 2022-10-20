import { IIPCAandCDI, InfoIndicator } from "../shared/types";

async function fetchIndicators(): Promise<InfoIndicator> {
    const response = await fetch('http://localhost:3000/indicadores');
	const indicators: IIPCAandCDI[] = await response.json();
	const baseIndicators: InfoIndicator = indicators.reduce((acc, indicator) => {
		acc[indicator.nome] = `${String(indicator.valor).replace('.', ',')}%`;
		return acc;
	}, {} as InfoIndicator);
    return baseIndicators;
	
}
    
export default fetchIndicators;