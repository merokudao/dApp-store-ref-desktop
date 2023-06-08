import { Head, Html, Main, NextScript } from "next/document";
import { generalSans } from "../theme";

export default function Document() {
	const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

	return (
		<Html
			className={`bg-canvas-color text-text-color ${generalSans.className}`}
		>
			<Head>
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            });
          `,
					}}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}