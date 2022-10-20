import type { NextPage } from 'next';
import { Col, Row } from 'react-bootstrap';
import styles from '../styles/Home.module.scss';
import { ReactNode, useEffect } from 'react';
import { useSimulatorStore } from '../contexts/Simulator';
import { CardTextKeys } from '../shared/constants';
import { InfoIndicator } from '../shared/types';
import Card from '../components/Card';
import Chart from '../components/Chart';
import MyForm from '../components/Form';
import { useQuery } from 'react-query';
import fetchIndicators from '../utils/FetchIndicators';

function ReturnCards(obj: object): ReactNode[] {
	const elements = [];
	for (const [key, value] of Object.entries(obj)) {
		const typeValue = key === 'aliquotaIR' ? 'percentage' : 'currency';
		if (['valorFinalBruto', 'aliquotaIR', 'valorPagoIR', 'valorTotalInvestido'].includes(key)) {
			elements.push(<Card typeValue={typeValue} title={key as CardTextKeys} value={value} />);
		} else if (['valorFinalLiquido', 'ganhoLiquido'].includes(key)) {
			elements.push(<Card title={key as CardTextKeys} value={value} isGreen />);
		}
	}
	return elements;
}
interface HomeProps {
	baseIndicators: InfoIndicator;
}

const Home: NextPage<HomeProps> = ({ baseIndicators }) => {
	const { data } = useQuery<InfoIndicator>('indicators', fetchIndicators, {
		initialData: baseIndicators,
	});
	const simulationInfo = useSimulatorStore((s) => s.simulationInfo);
	const setALot = useSimulatorStore((s) => s.setALot);

	useEffect(() => {
		if (data) {
			setALot(data);
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className=" p-4">
				<h1 className="text-center">Simulador de investimentos</h1>
				<div className={styles.core}>
					<div>
						<h4 className="text-center text-lg-start">Simulador</h4>
						<MyForm />
					</div>
					<div className="p-4 ">
						{!!Object.values(simulationInfo).length && (
							<>
								<h4 className="text-center text-lg-start mt-4 mt-lg-0">
									Resultado da Simulação
								</h4>
								<div className="d-flex flex-column">
									<Row className="w-100  mx-auto">
										{ReturnCards(simulationInfo).map((card, index) => (
											<Col
												xs="12"
												sm="6"
												lg="4"
												className="my-2 d-flex justify-content-center mx-auto"
												key={index}
											>
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
										title="Projeção de valores"
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
	const baseIndicators = await fetchIndicators();
	return { props: { baseIndicators } };
}
