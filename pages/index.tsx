import type { NextPage } from 'next';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import MainButton from '../components/MainButton';
import CleanButton from '../components/CleanButton';
import styles from '../styles/Home.module.scss';
import NameChoice from '../components/NameChoice';
import MyInput from '../components/MyInput';
import MyButtonGroup from '../components/MyButtonGroup';
import {
	FormEvent,
	ReactNode,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSimulatorStore } from '../contexts/Simulator';
import { CardTextKeys, IndexingType, Performance } from '../shared/constants';
import { Data, Simulation } from '../shared/types';
import Card from '../components/Card';
import Chart from '../components/Chart';
import { BarDatum } from '@nivo/bar';

interface IIPCAandCDI {
	nome: string;
	valor: number;
}

type InfoIndicator = {
	[key: string]: string;
};

const dictAPI = {
	[IndexingType.PRE]: 'pre',
	[IndexingType.POS]: 'pos',
	[IndexingType.FIXADO]: 'ipca',
	[Performance.BRUTO]: 'bruto',
	[Performance.LIQUIDO]: 'liquido',
};

function ReturnCards(obj: object): ReactNode[] {
	const elements = [];
	for (const [key, value] of Object.entries(obj)) {
		const typeValue = key === 'aliquotaIR' ? "percentage" : "currency";
		if (['valorFinalBruto', 'aliquotaIR', 'valorPagoIR', 'valorTotalInvestido'].includes(key)) {
			elements.push(<Card  typeValue={typeValue} title={key as CardTextKeys} value={value} />);
		} else if (['valorFinalLiquido', 'ganhoLiquido'].includes(key)) {
			elements.push(<Card title={key as CardTextKeys} value={value} isGreen />);
		}
	}
	return elements;
}
interface IHomeProps {
	baseIndicators: InfoIndicator;
}

const Home: NextPage<IHomeProps> = ({ baseIndicators }) => {
	const data = useSimulatorStore((s) => s.data);
	const initial = useSimulatorStore((s) => s.data?.initial);
	const due = useSimulatorStore((s) => s.data?.due);
	const ipca = useSimulatorStore((s) => s.data?.ipca);
	const monthly = useSimulatorStore((s) => s.data?.monthly);
	const profitability = useSimulatorStore((s) => s.data?.profitability);
	const cdi = useSimulatorStore((s) => s.data?.cdi);
	const setALot = useSimulatorStore((s) => s.setALot);
	const cleanState = useSimulatorStore((s) => s.cleanState);
	const [simulationInfo, setSimulationInfo] = useState<Simulation>({} as Simulation);
	const isComplete = useMemo(() => Object.values(data).every((item) => item), [data]);

	async function onSubmit(event: FormEvent<HTMLFormElement>, data: Data) {
		event.preventDefault();
		const typeInfo = {
			tipoIndexacao: dictAPI[data.indexing],
			tipoRendimento: dictAPI[data.performance],
		};

		const response = await fetch('api/simulacoes');
		const { simulations }: { simulations: Simulation[] } = await response.json();

		console.log(simulations);

		const currentSimulation = simulations.filter(
			(simulation) =>
				simulation.tipoIndexacao === typeInfo.tipoIndexacao &&
				simulation.tipoRendimento === typeInfo.tipoRendimento
		)[0];

		const { semAporte, comAporte } = currentSimulation.graficoValores;
		const dataGraph: BarDatum[] = [];

		for (let i in semAporte) {
			dataGraph.push({
				mes: i,
				'Sem Aporte': semAporte[i],
				'Com Aporte': comAporte[i],
			});
		}

		console.log(dataGraph);
		setSimulationInfo({ ...currentSimulation, dataGraph });
	}

	useEffect(() => {
		setALot(baseIndicators);
	}, []);

	console.log(simulationInfo?.dataGraph);

	return (
		<div className={styles.container}>
			<div className=" p-4">
				<h1 className="text-center">Simulador de investimentos</h1>
				<div className={styles.core}>
					<div>
						<h4>Simulador</h4>
						<Form onSubmit={async (e) => await onSubmit(e, data)}>
							<Stack
								direction="horizontal"
								className="d-flex justify-content-center justify-content-sm-evenly justify-content-lg-between mb-4 flex-wrap"
							>
								<div>
									<NameChoice name="Rendimento" />
									<MyButtonGroup
										setALot={setALot}
										type="performance"
										names={[Performance.BRUTO, Performance.LIQUIDO]}
									/>
									<MyInput
										value={initial}
										onChange={setALot}
										label="Aporte Inicial"
										name="initial"
										prefix="R$ "
									/>
									<MyInput
										value={due}
										onChange={setALot}
										label="Prazo (em meses)"
										name="due"
									/>
									<MyInput
										value={ipca}
										onChange={setALot}
										label="IPCA (ao ano)"
										name="ipca"
										suffix="%"
									/>
								</div>

								<div>
									<NameChoice name="Tipo de indexação" />
									<MyButtonGroup
										type="indexing"
										setALot={setALot}
										names={[
											IndexingType.PRE,
											IndexingType.POS,
											IndexingType.FIXADO,
										]}
									/>
									<MyInput
										value={monthly}
										onChange={setALot}
										label="Aporte Mensal"
										name="monthly"
										prefix="R$ "
									/>
									<MyInput
										value={profitability}
										onChange={setALot}
										label="Rentabilidade"
										name="profitability"
										suffix="%"
									/>
									<MyInput
										value={cdi}
										onChange={setALot}
										label="CDI (ao ano)"
										name="cdi"
										suffix="%"
									/>
								</div>
							</Stack>
							<div className="d-flex flex-wrap flex-column flex-lg-row justify-content-lg-between align-items-center">
								<CleanButton onClear={cleanState}>Limpar campos</CleanButton>
								<MainButton status={isComplete ? 'actived' : 'blocked'}>
									Simular
								</MainButton>
							</div>
						</Form>
					</div>
					<div className="p-4">
						{!!Object.values(simulationInfo).length && (
							<>
								<h4>Resultado da Simulação</h4>
								<div className="d-flex flex-column">
									<Row className="flex-fill w-100">
										{ReturnCards(simulationInfo).map((card) => (
											<Col xs="12" sm="6" lg="4" className="my-2">
												{card}
											</Col>
										))}
									</Row>
									<Chart
										data={simulationInfo.dataGraph}
										columns={['Sem Aporte', 'Com Aporte']}
										colors={['hsl(0, 0%, 0%)', 'hsl(20, 70%, 50%)']}
										legendNameLeft="Valor (R$)"
										legendNameBottom="Tempo (meses)"
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	// Fetch data from external API

	const response = await fetch('http://localhost:3000/indicadores');
	const indicators: IIPCAandCDI[] = await response.json();
	const baseIndicators: InfoIndicator = indicators.reduce((acc, indicator) => {
		acc[indicator.nome] = `${String(indicator.valor).replace('.', ',')}%`;
		return acc;
	}, {} as InfoIndicator);

	return { props: { baseIndicators } };
}
