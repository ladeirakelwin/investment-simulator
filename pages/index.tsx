import type { NextPage } from 'next'
import { Container, Form, Row, Stack } from 'react-bootstrap'
import MainButton from '../components/MainButton'
import CleanButton from '../components/CleanButton'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Container fluid className='text-center p-4'>
        <h1>Simulador de investimentos</h1>
        <div className={styles.core}>
          <div>
            <h4>Simulador</h4>
            <Form>
              <div>

              </div>
              <div className='d-flex flex-wrap flex-column flex-lg-row justify-content-lg-between align-items-center'>
                <CleanButton>Limpar campos</CleanButton>
                <MainButton status='actived'>Simular</MainButton>
              </div>
            </Form>
          </div>
          <div>b</div>
        </div>
      </Container>
    </div>
  )
}

export default Home
