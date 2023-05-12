import { Provider } from 'react-redux';
import { store } from '../store';
import type { AppProps } from 'next/app';
import { IWeb3ConnectConfig, Web3Connect } from '../features/wallet_connect';
import { WagmiConfig, mainnet, sepolia } from 'wagmi';
import { chains } from '../features/wallet_connect/config';
import { WC_PROJECT_ID } from '../api/constants';
import { Web3Modal } from '@web3modal/react';
export default function App({ Component, pageProps }: AppProps) {
    const web3Config: IWeb3ConnectConfig = new Web3Connect(chains, WC_PROJECT_ID!);
    return (
        <Provider store={store}>
            <WagmiConfig config={web3Config.wagmiConfig}>
                <Component {...pageProps} />

            </WagmiConfig>

        </Provider>
    )
}