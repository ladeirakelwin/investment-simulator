import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
