import { BarDatum } from '@nivo/bar';
import React, { FormEvent, useMemo, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery, UseQueryResult } from 'react-query';
import { useSimulatorStore } from '../../contexts/Simulator';
import { apiParameters, IndexingType, Performance } from '../../shared/constants';
import { Data, Simulation } from '../../shared/types';
import fetchSimulations from '../../utils/FetchSimulations';
import CleanButton from '../CleanButton';
import MainButton from '../MainButton';
import MyButtonGroup from '../MyButtonGroup';
import MyInput from '../MyInput';
import NameChoice from '../NameChoice';


type Refetch = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<Simulation[], unknown>>;

const MyForm: React.FC = () => {
	const simulatorData = useSimulatorStore((s) => s.data);
	const initial = useSimulatorStore((s) => s.data?.initial);
	const due = useSimulatorStore((s) => s.data?.due);
	const ipca = useSimulatorStore((s) => s.data?.ipca);
	const monthly = useSimulatorStore((s) => s.data?.monthly);
	const profitability = useSimulatorStore((s) => s.data?.profitability);
	const cdi = useSimulatorStore((s) => s.data?.cdi);
	const setALot = useSimulatorStore((s) => s.setALot);
	const cleanState = useSimulatorStore((s) => s.cleanState);
	const setSimulationInfo = useSimulatorStore((s) => s.setSimulationInfo);
	const isComplete = useMemo(
		() => Object.values(simulatorData).every((item) => item),
		[simulatorData]
	);
	const { data } = useQuery<Simulation[]>('simulations', fetchSimulations);

	async function onSubmit(
		event: FormEvent<HTMLFormElement>,
		simulatorData: Data,
		data: Simulation[] | undefined
	) {
		event.preventDefault();
		const typeInfo = {
			tipoIndexacao: apiParameters[simulatorData.indexing],
			tipoRendimento: apiParameters[simulatorData.performance],
		};
		
		if (data) {
			const currentSimulation = data.find(
				(simulation) =>
					simulation.tipoIndexacao === typeInfo.tipoIndexacao &&
					simulation.tipoRendimento === typeInfo.tipoRendimento
			);

			if (currentSimulation) {
				const dataGraph: BarDatum[] = [];

				for (let i in currentSimulation.graficoValores.semAporte) {
					dataGraph.push({
						mes: i,
						'Sem Aporte': currentSimulation.graficoValores.semAporte[i],
						'Com Aporte': currentSimulation.graficoValores.comAporte[i],
					});
				}

				setSimulationInfo({ ...currentSimulation, dataGraph });
			}
		}
	}
	return (
		<Form onSubmit={async (e) => await onSubmit(e, simulatorData, data)}>
			<Stack
				direction="horizontal"
				className="d-flex justify-content-center justify-content-sm-evenly justify-content-xl-between mb-4 flex-wrap flex-lg-nowrap"
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
					<MyInput value={due} onChange={setALot} label="Prazo (em meses)" name="due" />
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
						names={[IndexingType.PRE, IndexingType.POS, IndexingType.FIXADO]}
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
			<div className="d-flex flex-wrap flex-column flex-lg-row justify-content-evenly  justify-content-xl-between align-items-center">
				<CleanButton onClear={cleanState}>Limpar campos</CleanButton>
				<MainButton status={isComplete ? 'actived' : 'blocked'}>Simular</MainButton>
			</div>
		</Form>
	);
};

export default MyForm;
