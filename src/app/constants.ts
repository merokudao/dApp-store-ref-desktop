export const App = {
	name: "Web Store",
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

// const zkevmConfig:AppConfig = {
//     title: "zkEVM dApps",
//     chainId: 1101,
//     hero: {
//         title: "Experience the newest   and your favourite  dApps on #zkEVM ",
//         subtitle: "The dApps in our ecosystem set the standard for privacy, security and content quality.",
//         button: {
//             text: 'Submit your dApp',
//             href: '',
//         },
//         video:"https://player.vimeo.com/video/791153931?h=969d328799"
//     },
// }

const posConfig: AppConfig = {
	title: "Meroku Explorer",
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