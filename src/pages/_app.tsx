import { Provider } from 'react-redux';
import { store } from '../store';
import type { AppProps } from 'next/app';
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import type { Session } from 'next-auth';

import Layout from "../components/layout";
import { wagmiConfig } from '../features/wallet_connect';
import { useAccount, WagmiConfig } from 'wagmi';
import { chains } from '../features/wallet_connect/config';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import {
    darkTheme,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
export default function App({ Component, pageProps }: AppProps<{
    session: Session;
}>) {


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


    return (

        <Provider store={store}>


            <WagmiConfig config={wagmiConfig}>
                <SessionProvider refetchInterval={0} session={pageProps.session}>
                    <RainbowKitSiweNextAuthProvider >
                        <RainbowKitProvider chains={chains} theme={darkTheme()}>
                            <Layout  className={generalSans.className}>
                                <Component {...pageProps} />
                            </Layout>
                        </RainbowKitProvider>

                    </RainbowKitSiweNextAuthProvider>
                </SessionProvider>
            </WagmiConfig>

        </Provider>

    )
}