import "@rainbow-me/rainbowkit/styles.css";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "./globals.css";

import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { WagmiConfig } from "wagmi";
import Layout from "../components/layout";
import { wagmiConfig } from "../features/wallet_connect";
import { chains } from "../features/wallet_connect/config";

import { Poppins } from "next/font/google";

const poppins = Poppins({
	variable: "--font-poppins",
	display: "swap",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	const TypeFixedComponent = Component as any;

	return (
		<>
			<style jsx global>{`
				:root {
					--font-poppins: ${poppins.style.fontFamily};
				}
			`}</style>
			<main className={`${poppins.variable} font-sans`}>
				<Provider store={store}>
					{/* This provides all the necssary config for wallet connections */}
					<WagmiConfig config={wagmiConfig}>
						<RainbowKitProvider
							chains={chains}
							theme={lightTheme({
								borderRadius: "medium",
								fontStack: "system",
							})}
						>
							<Layout>
								<TypeFixedComponent {...pageProps} />
							</Layout>
						</RainbowKitProvider>
					</WagmiConfig>
				</Provider>
			</main>
		</>
	);
}
