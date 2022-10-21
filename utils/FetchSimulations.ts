import { Simulation } from '../shared/types';

async function fetchSimulations(): Promise<Simulation[]> {
	const response = await fetch('api/simulacoes');
	const { simulations }: { simulations: Simulation[] } = await response.json();
	return simulations;
}

export default fetchSimulations;
