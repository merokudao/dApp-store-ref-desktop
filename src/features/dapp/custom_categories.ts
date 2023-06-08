/*
Meroku dapp store sends a big list of categories, out of which dapp stores might want to show limited categories
or a few categories clustered up, this file contains a list of Categories and subcategories that needs to be shown in dappstore
*/
export const categories = {
	message: "success",
	data: [
		{
			category: "Business",
			subCategory: [],
		},
		{
			category: "Utilities",
			subCategory: ["Wallets"],
		},
		{
			category: "Dev Tools",
			subCategory: [
				"Security",
				"Monitoring",
				"Storage",
				"Front Ends",
				"Messaging",
				"Block Explorers",
				"Indexer",
			],
		},
		{
			category: "Social",
			subCategory: [],
		},
		{
			category: "Infrastructure",
			subCategory: [
				"Oracles",
				"Node Infra",
				"Bridges",
				"Identity",
				"Payments",
				"Analytics",
			],
		},
		// {
		//   category: "Metaverse",
		//   subCategory: [],
		// },
		{
			category: "Gaming",
			subCategory: [
				"Puzzle and strategy games",
				"Action and adventure games",
				"First-person action games",
				"Role-playing games (RPG)",
				"Sports and racing games",
				"Simulation games",
				"Studios",
				"Metaverse",
			],
		},
		{
			category: "NFT",
			subCategory: [
				"Marketplace",
				"Music",
				"Domain Names",
				"PFPs",
				"Social Graph",
				"Art",
				"NFT Tooling / Infra",
			],
		},
		{
			category: "Productivity",
			subCategory: ["DAO", "DAO Investing", "DAO Tooling", "DAO - Misc"],
		},
		{
			category: "DeFi",
			subCategory: [
				"Stablecoins",
				"Decentralized Exchanges",
				"Lending and Borrowing",
				"Liquid Staking",
				"Yield Aggregation / Farming",
				"Derivatives, Perps, Trading",
				"Real World Assets / Tokenization",
				"Insurance",
				"Payments",
				"Prediction Markets",
				"DeFi - Other",
				"On-Ramp/Off-Ramp",
				"Trading",
			],
		},
		{
			category: "Education",
			subCategory: [],
		},
		{
			category: "Others",
			subCategory: [],
		},
	],
};