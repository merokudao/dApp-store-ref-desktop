import {Provider} from 'react-redux';
import {store} from '../store';
import type {AppProps} from 'next/app';
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import type {Session} from 'next-auth';

import Layout from "../components/layout";
import {wagmiConfig} from '../features/wallet_connect';
import {WagmiConfig} from 'wagmi';
import {chains} from '../features/wallet_connect/config';
import {RainbowKitSiweNextAuthProvider} from '@rainbow-me/rainbowkit-siwe-next-auth';
import {SessionProvider} from 'next-auth/react';
import {darkTheme, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App({ Component, pageProps }: AppProps<{
    session: Session;
}>) {
    return (
        <Provider store={store}>
            <WagmiConfig config={wagmiConfig}>
                <SessionProvider refetchInterval={0} session={pageProps.session}>
                    <RainbowKitSiweNextAuthProvider >
                        <RainbowKitProvider chains={chains} theme={darkTheme()}>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </RainbowKitProvider>
                    </RainbowKitSiweNextAuthProvider>
                </SessionProvider>
            </WagmiConfig>
        </Provider>

    )
}