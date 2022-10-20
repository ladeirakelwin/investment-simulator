import create from 'zustand';
import { IndexingType, Performance } from '../../shared/constants';
import { Data, Simulation } from '../../shared/types';

const initialState = {
	data: {
		initial: '',
		due: '',
		ipca: '',
		monthly: '',
		profitability: '',
		cdi: '',
		performance: Performance.BRUTO,
		indexing: IndexingType.PRE,
	},
	simulationInfo: {} as Simulation,
};

type SimulatorData = {
	data: Data;
	simulationInfo: Simulation;
	setALot: (data: Partial<Data>) => void;
	cleanState: () => void;
	setSimulationInfo: (data: Simulation) => void;
};

export const useSimulatorStore = create<SimulatorData>((set) => ({
	...initialState,
	setALot: (newData: Partial<Data>) =>
		set((state) => ({ ...state, data: { ...state.data, ...newData } })),
	setSimulationInfo: (newData: Simulation) => set((state) => ({ ...state, simulationInfo: {...state.simulationInfo, ...newData} })),
	cleanState: () => set((state) => ({ ...state, ...initialState })),
}));
