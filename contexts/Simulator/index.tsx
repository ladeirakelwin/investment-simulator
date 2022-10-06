import create from 'zustand';

type SimulatorData = {
	initial: string | undefined;
	due: string | undefined;
	ipca: string | undefined;
	monthly: string | undefined;
	profitability: string | undefined;
	cdi: string | undefined;
	changeInitial: (data: Partial<SimulatorData>) => void;
	changeDue: (data: Partial<SimulatorData>) => void;
	changeIPCA: (data: Partial<SimulatorData>) => void;
	changeMonthly: (data: Partial<SimulatorData>) => void;
	changeProfitability: (data: Partial<SimulatorData>) => void;
	changeCDI: (data: Partial<SimulatorData>) => void;
    changeALot: (data: Partial<SimulatorData>) => void;
    cleanState: () => void;
};

const initialState = {
	initial: '',
	due: '',
	ipca: '',
	monthly: '',
	profitability: '',
	cdi: '',
};
export const useSimulatorStore = create<SimulatorData>((set) => ({
	...initialState,
	changeInitial: (data: Partial<SimulatorData>) =>
		set((state) => ({ ...state, initial: data?.initial })),
	changeDue: (data: Partial<SimulatorData>) => set((state) => ({ ...state, due: data?.due })),
	changeIPCA: (data: Partial<SimulatorData>) => set((state) => ({ ...state, ipca: data?.ipca })),
	changeMonthly: (data: Partial<SimulatorData>) =>
		set((state) => ({ ...state, monthly: data?.monthly })),
	changeProfitability: (data: Partial<SimulatorData>) =>
		set((state) => ({ ...state, profitability: data?.profitability })),
	changeCDI: (data: Partial<SimulatorData>) => set((state) => ({ ...state, cdi: data?.cdi })),
	changeALot: (data: Partial<SimulatorData>) => set((state) => ({ ...state, ...data })),
	cleanState: () => set((state) => ({ ...state, ...initialState })),
}));
