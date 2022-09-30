import type { NextPage } from 'next';
import { Container, Form, Row, Stack } from 'react-bootstrap';
import MainButton from '../components/MainButton';
import CleanButton from '../components/CleanButton';
import styles from '../styles/Home.module.scss';
import NameChoice from '../components/NameChoice';
import MyInput from '../components/MyInput';
import MyButtonGroup from '../components/MyButtonGroup';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Container fluid className=" p-4">
				<h1 className="text-center">Simulador de investimentos</h1>
				<div className={styles.core}>
					<div>
						<h4>Simulador</h4>
						<Form>
							<Stack direction='horizontal' className='d-flex justify-content-center justify-content-sm-evenly justify-content-lg-between mb-4 flex-wrap'>
								<div>
									<NameChoice name="Rendimento" />
                  <MyButtonGroup names={['Bruto','Líquido']}/>
									<MyInput label="Aporte Inicial" />
									<MyInput label="Prazo (em meses)" type="number" />
									<MyInput label="IPCA (ao ano)" type="number"/>
								</div>

								<div>
									<NameChoice name="Tipo de indexação" />
                  <MyButtonGroup names={['Pré','Pós','Fixado']}/>
									<MyInput label="Aporte Mensal" />
									<MyInput label="Rentabilidade" type="number" />
									<MyInput label="CDI (ao ano)" type="number" />
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
