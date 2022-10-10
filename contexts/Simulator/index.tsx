import create from 'zustand';
import { IndexingType, Performance } from '../../shared/constants';
import { Data } from '../../shared/types';

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
};



type SimulatorData = {
	data: Data;
	setALot: (data: Partial<Data>) => void;
	cleanState: () => void;
};

export const useSimulatorStore = create<SimulatorData>((set) => ({
	...initialState,
	setALot: (newData: Partial<Data>) =>
		set((state) => ({ ...state, data: { ...state.data, ...newData } })),
	cleanState: () => set((state) => ({ ...state, ...initialState })),
}));
