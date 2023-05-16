import { Provider } from 'react-redux';
import { store } from '../store';
import type { AppProps } from 'next/app';
import "./globals.css";
import {Dapp} from "../features/dapp/models/dapp";
import Layout from "../components/layout";

export default function App({ Component, pageProps }: AppProps) {
    // const web3Config: IWeb3ConnectConfig = new Web3Connect(chains, WC_PROJECT_ID!);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}