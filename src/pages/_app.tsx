import { Provider } from 'react-redux';
import { store } from '../store';
import type { AppProps } from 'next/app';
import {Dapp} from "../features/dapp/models/dapp";
import Layout from "../components/layout";
import "./globals.css";

import localFont from "next/font/local";

export const generalSans = localFont({
    src: [
        {
            path: './GeneralSans/GeneralSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './GeneralSans/GeneralSans-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './GeneralSans/GeneralSans-Bold.ttf',
            weight: '800',
            style: 'normal',
        }
    ],
    display: 'swap',
    fallback: ['system-ui'],
    variable: '--font-sans',
});


export default function App({ Component, pageProps }: AppProps) {
    // const web3Config: IWeb3ConnectConfig = new Web3Connect(chains, WC_PROJECT_ID!);
    return (
        <Provider store={store}>
            <Layout className={generalSans.className}>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    )
}