import { configureChains, createConfig } from "wagmi";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { WC_PROJECT_ID } from "../../api/constants";
import { chains } from "./config";
import { publicProvider } from "wagmi/providers/public";
// exports all the necessary data for wallet connect.
export const { connectors } = getDefaultWallets({
	appName: "Meroku Explorer",
	projectId: WC_PROJECT_ID ?? "",
	chains: chains,
});
export const { publicClient } = configureChains(chains, [publicProvider()]);

export const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: connectors,
	publicClient,
});
