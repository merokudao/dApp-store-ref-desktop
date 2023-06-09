import "@rainbow-me/rainbowkit/styles.css";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "./globals.css";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { WagmiConfig } from "wagmi";
import Layout from "../components/layout";
import { wagmiConfig } from "../features/wallet_connect";
import { chains } from "../features/wallet_connect/config";
import { generalSans } from "../theme";
import Head from 'next/head';


export default function App({
    Component,
    pageProps,
}: AppProps<{
    session: Session;
}>) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Provider store={store}>
                {/* This provides all the necssary config for wallet connections */}
                <WagmiConfig config={wagmiConfig}>
                    {/* Session store and rainbow kit store is used for authenticting wallet */}
                    <SessionProvider refetchInterval={0} session={pageProps.session}>
                        <RainbowKitSiweNextAuthProvider >
                            {/* Rainbow kit is being used for wallet conection */}
                            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                                <Layout className={generalSans.className}>
                                    <Component {...pageProps} />

                                </Layout>

                            </RainbowKitProvider>
                        </RainbowKitSiweNextAuthProvider>
                    </SessionProvider>
                </WagmiConfig>
            </Provider>
        </>
    )
}
