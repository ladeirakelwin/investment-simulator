import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
			{/* <ReactQueryDevtools initialIsOpen={false}  /> */}
		</QueryClientProvider>
	);
}

export default MyApp;
