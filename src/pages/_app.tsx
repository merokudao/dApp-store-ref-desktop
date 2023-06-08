import "@rainbow-me/rainbowkit/styles.css";
import type { Session } from "next-auth";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store";
import "./globals.css";

import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { WagmiConfig } from "wagmi";
import Layout from "../components/layout";
import { wagmiConfig } from "../features/wallet_connect";
import { chains } from "../features/wallet_connect/config";
import { generalSans } from "../theme";

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	return (
		<Provider store={store}>
			<WagmiConfig config={wagmiConfig}>
				<SessionProvider
					refetchInterval={0}
					session={pageProps.session}
				>
					<RainbowKitSiweNextAuthProvider>
						<RainbowKitProvider chains={chains} theme={darkTheme()}>
							<Layout className={generalSans.className}>
								<Component {...pageProps} />
							</Layout>
						</RainbowKitProvider>
					</RainbowKitSiweNextAuthProvider>
				</SessionProvider>
			</WagmiConfig>
		</Provider>
	);
}
