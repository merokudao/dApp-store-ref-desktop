const AppStrings = {
	title: "Polygon dApps",
	allDapps: "All dApps",
	visitDapp: "Visit Dapp",
	searchDapps: "Search dApps",
	browsingHistory: "Browsing History",
	connectWallet: "Connect Wallet",
	clickEvents: "Click Events",
	about: "About",
	gallery: "Gallery",
	social: "Social",
	readMore: "Read More",
	readLess: "Read Less",
	contactUs: "Contact Us",
	reviewsTitle: "All Reviews",
	featuredDapps: "Featured Dapps",
	back: "Back",
	faq: "FAQ",
	connectWalletTooltip: "Connect Wallet to claim and update dapps",
	submitDappTooltip:
		"You will be redirected to a separate webpage to submit your dApp",
	ratings: "Ratings",
	allChains: "All Chains",
	anonymousAnalyticsTag: 'anonymous_odde',

}

const allChains: {
	name: string;
	chainId: number | null;
	image: string | null;
}[] = [
		{
			name: "All",
			chainId: null,
			image: null,
		},
		{
			name: "Ethereum",
			chainId: 1,
			image: "/assets/images/chains/ethereum.png",
		},
		{
			name: "Polygon",
			chainId: 137,
			image: "/assets/images/chains/polygon.png",
		},
		{
			name: "zkEVM",
			chainId: 1101,
			image: "/assets/images/chains/polygon.png",
		},
	];

export { AppStrings, allChains };
const defaultExport = () => { };
export default defaultExport;
