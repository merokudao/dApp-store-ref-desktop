const AppStrings = {
	title: "Polygon dApps",
	allDapps: "All dApps",
	visitDapp: "Visit Dapp",
	searchDapps: "Search dApps",
	browsingHistory: "Browsing History",
	connectWallet: "Connect Wallet",
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
};

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
		chainId: 137,
		image: "/assets/images/chains/ethereum.png",
	},
	{
		name: "Polygon",
		chainId: 138,
		image: "/assets/images/chains/polygon.png",
	},
	{
		name: "BNB",
		chainId: 139,
		image: "/assets/images/chains/bnb.png",
	},
	{
		name: "Starknet",
		chainId: 140,
		image: "/assets/images/chains/starknet.png",
	},
	{
		name: "Fandom",
		chainId: 150,
		image: "/assets/images/chains/fandom.png",
	},
];

export { AppStrings, allChains };
const defaultExport = () => {};
export default defaultExport;
