import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { FallbackTransport, recoverAddress } from "viem";
import { Chain, Config, PublicClient, WebSocketPublicClient, configureChains, createConfig } from "wagmi";
import { QueryClient } from '@tanstack/react-query';
import { getWalletClient } from '@wagmi/core'
import { ethers, Transaction } from 'ethers';


export interface IWeb3ConnectConfig {
    chains: Array<Chain>;
    wcProjectId: string;
    ethereumClient: EthereumClient;
    wagmiConfig: Config<PublicClient<FallbackTransport, Chain>, WebSocketPublicClient> & {
        queryClient: QueryClient;
    }
}
export class Web3Connect implements IWeb3ConnectConfig {
    chains: Array<Chain>;
    wcProjectId: string;
    ethereumClient: EthereumClient;
    wagmiConfig: Config<PublicClient<FallbackTransport, Chain>, WebSocketPublicClient> & {
        queryClient: QueryClient;
    }
    constructor(chains: Array<Chain>, projectId: string) {
        this.chains = chains;
        this.wcProjectId = projectId;

        const { publicClient } = configureChains(chains, [w3mProvider({ projectId: this.wcProjectId })])
        this.wagmiConfig = createConfig({
            autoConnect: true,
            connectors: w3mConnectors({ projectId, version: 1, chains }),
            publicClient
        })
        this.ethereumClient = new EthereumClient(this.wagmiConfig, chains)

    }
    disconnect() {
        this.ethereumClient.disconnect();
    }

    async verifyWallet() {
        const walletClient = await getWalletClient();
        const timestamp = Date.now();
        const message = `I Verify this wallet ${timestamp.toString()}`;
        const signature = await walletClient!.signMessage({ message });
        if (signature != undefined || signature != null) {
            const recoveredAddress = await recoverAddress({ hash: Uint8Array.from(Buffer.from(message)), signature: signature });
            if (recoveredAddress == ((await walletClient!.getAddresses()) ?? [""])[0]) {
                return true;
            } else {
                false;
            }
        }
    }

};