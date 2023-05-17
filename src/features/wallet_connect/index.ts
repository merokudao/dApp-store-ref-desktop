import { configureChains, createConfig } from "wagmi";
import {
    getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WC_PROJECT_ID } from "../../api/constants";
import { chains } from "./config";
import { useAccount } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';

export const { connectors } = getDefaultWallets({ appName: 'DappStore', projectId: WC_PROJECT_ID ?? "", chains: chains })
export const { publicClient } = configureChains(chains, [publicProvider()])

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: connectors,
    publicClient
})
export const getAddress = async () => {
    const { address, } = useAccount()
    console.log("Address:", address)
    return address;

}
