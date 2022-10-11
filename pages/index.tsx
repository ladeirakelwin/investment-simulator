import type { NextPage } from 'next';
import { Container, Form, Row, Stack } from 'react-bootstrap';
import MainButton from '../components/MainButton';
import CleanButton from '../components/CleanButton';
import styles from '../styles/Home.module.scss';
import NameChoice from '../components/NameChoice';
import MyInput from '../components/MyInput';
import MyButtonGroup from '../components/MyButtonGroup';
import { FormEvent, FormEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useSimulatorStore } from '../contexts/Simulator';
import { IndexingType, Performance } from '../shared/constants';
import { Data, Simulations } from '../shared/types';

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
	[IndexingType.FIXADO]: 'fixado',
	[Performance.BRUTO]: 'bruto',
	[Performance.LIQUIDO]: 'liquido',
};

async function onSubmit(event: FormEvent<HTMLFormElement>, data: Data) {
	event.preventDefault();
	const typeInfo = {
		tipoIndexacao: dictAPI[data.indexing],
		tipoRendimento: dictAPI[data.performance],
	};

	
	// const currentSimulation = body.filter(
	// 	(simulation) =>
	// 		simulation.tipoIndexacao === typeInfo.tipoIndexacao &&
	// 		simulation.tipoRendimento === typeInfo.tipoRendimento
	// )[0];
	// console.log(currentSimulation);
}
interface IHomeProps {
	 baseIndicators: InfoIndicator,
}

const Home: NextPage<IHomeProps> = ({baseIndicators}) => {
	const data = useSimulatorStore((s) => s.data);
	const initial = useSimulatorStore((s) => s.data?.initial);
	const due = useSimulatorStore((s) => s.data?.due);
	const ipca = useSimulatorStore((s) => s.data?.ipca);
	const monthly = useSimulatorStore((s) => s.data?.monthly);
	const profitability = useSimulatorStore((s) => s.data?.profitability);
	const cdi = useSimulatorStore((s) => s.data?.cdi);
	const setALot = useSimulatorStore((s) => s.setALot);
	const cleanState = useSimulatorStore((s) => s.cleanState);

	const isComplete = useMemo(() => Object.values(data).every((item) => item), [data]);

	useEffect(() => {
		setALot(baseIndicators)
	}, []);

	return (
		<div className={styles.container}>
			<Container fluid className=" p-4">
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
					<div>b</div>
				</div>
			</Container>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	// Fetch data from external API
	

	const response = await fetch('http://localhost:3000/indicadores');
	const indicators: IIPCAandCDI[] = await response.json();
	const baseIndicators: InfoIndicator = indicators.reduce((acc,indicator) => {
		acc[indicator.nome] = `${String(indicator.valor).replace('.', ',')}%`;
		return acc;
	}, {} as InfoIndicator)


	// Pass data to the page via props
	return { props: { baseIndicators } };
}
