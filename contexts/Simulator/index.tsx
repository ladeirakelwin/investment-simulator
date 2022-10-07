import create from 'zustand';
type Data = {
	initial: string | undefined;
	due: string | undefined;
	ipca: string | undefined;
	monthly: string | undefined;
	profitability: string | undefined;
	cdi: string | undefined;
};
type SimulatorData = {
	data: Data;
	setALot: (data: Partial<Data>) => void;
	cleanState: () => void;
};

const initialState = {
	data: {
		initial: '',
		due: '',
		ipca: '',
		monthly: '',
		profitability: '',
		cdi: '',
	},
};
export const useSimulatorStore = create<SimulatorData>((set) => ({
	...initialState,
	setALot: (newData: Partial<Data>) =>
		set((state) => ({ ...state, data: { ...state.data, ...newData } })),
	cleanState: () => set((state) => ({ ...state, ...initialState })),
}));
