export const App = {
	name: "Meroku Explorer",
	logo: {
		height: 40,
		width: 190,
		src: "/meroku-full-logo.svg",
	},
	menu: [
		// {
		//     'href': '/',
		//     title: 'dApps',
		// },
		// {
		//     'href': '/categories',
		//     title: 'Categories',
		// },
	],
};

interface AppConfig {
	title: string;
	chainId: number;
	hero: {
		title: string;
		subtitle: string;
		button: {
			text: string;
			href: string;
		};
		video: string;
	};
	footer: {
		text: string;
	};
}

const posConfig: AppConfig = {
	title: "Meroku Protocol Explorer",
	chainId: 137,
	hero: {
		title: "The world of apps on Meroku",
		subtitle:
			"The apps in our ecosystem set the standard for privacy,security and content quality.",
		button: {
			text: "Submit your app",
			href: "",
		},
		video: "https://player.vimeo.com/video/791153898?h=da72488da5",
	},
	footer: {
		text: "World's first decentralised app store protocol",
	},
};

export type { AppConfig };
export {};
export { posConfig };
