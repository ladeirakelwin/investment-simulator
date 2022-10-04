import type { NextPage } from 'next';
import { Container, Form, Row, Stack } from 'react-bootstrap';
import MainButton from '../components/MainButton';
import CleanButton from '../components/CleanButton';
import styles from '../styles/Home.module.scss';
import NameChoice from '../components/NameChoice';
import MyInput from '../components/MyInput';
import MyButtonGroup from '../components/MyButtonGroup';
import { useEffect, useState } from 'react';

export type simulatorData = {
	initial: number | undefined;
	due: number | undefined;
	ipca: number | undefined;
	monthly: number | undefined;
	profitability: number | undefined;
	cdi: number | undefined;
};

interface IIPCAandCDI {
	nome: string;
	valor: number;
}

type InfoIndicator = {
	[key: string]: number;
};

function getIPCAandCDI(currentState: simulatorData, callback: Function) {
	return fetch('http://localhost:3000/indicadores')
		.then((response) => response.json())
		.then((data: IIPCAandCDI[]) => {
			const newData: InfoIndicator = {} as InfoIndicator;
			data.forEach(({ nome, valor }) => {
				newData[nome] = valor;
			});
			callback({ ...currentState, ...newData });
		});
}

const Home: NextPage = () => {
	const [formData, setFormData] = useState<simulatorData>({
		initial: undefined,
		due: undefined,
		ipca: undefined,
		monthly: undefined,
		profitability: undefined,
		cdi: undefined,
	});

	console.log(formData);

	useEffect(() => {
		getIPCAandCDI(formData, setFormData);
	}, []);

	return (
		<div className={styles.container}>
			<Container fluid className=" p-4">
				<h1 className="text-center">Simulador de investimentos</h1>
				<div className={styles.core}>
					<div>
						<h4>Simulador</h4>
						<Form>
							<Stack
								direction="horizontal"
								className="d-flex justify-content-center justify-content-sm-evenly justify-content-lg-between mb-4 flex-wrap"
							>
								<div>
									<NameChoice name="Rendimento" />
									<MyButtonGroup names={['Bruto', 'Líquido']} />
									<MyInput label="Aporte Inicial" type="number" name="initial" />
									<MyInput label="Prazo (em meses)" type="number" name="due" />
									<MyInput label="IPCA (ao ano)" type="number" name="ipca" />
								</div>

								<div>
									<NameChoice name="Tipo de indexação" />
									<MyButtonGroup names={['Pré', 'Pós', 'Fixado']} />
									<MyInput label="Aporte Mensal" type="number" name="monthly" />
									<MyInput
										label="Rentabilidade"
										type="number"
										name="profitability"
									/>
									<MyInput label="CDI (ao ano)" type="number" name="cdi" />
								</div>
							</Stack>
							<div className="d-flex flex-wrap flex-column flex-lg-row justify-content-lg-between align-items-center">
								<CleanButton>Limpar campos</CleanButton>
								<MainButton status="actived">Simular</MainButton>
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
