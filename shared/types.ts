import { IndexingType, Performance } from "./constants";

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