import create from 'zustand';

enum IndexingType {
	PRE = 'Pré',
	POS = 'Pós',
	FIXADO = 'Fixado',
}

enum Performance {
	BRUTO = 'Bruto',
	LIQUIDO = 'Líquido',
}

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

type Data = {
	initial: string | undefined;
	due: string | undefined;
	ipca: string | undefined;
	monthly: string | undefined;
	profitability: string | undefined;
	cdi: string | undefined;
	performance: Performance;
	indexing: IndexingType;
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
