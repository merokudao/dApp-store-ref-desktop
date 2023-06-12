// let merokuJsonString = `{
//     "message": "success",
//     "data": [
//       {
//         "category": "books",
//         "subCategory": [
//           "ebooks",
//           "audiobooks",
//           "document-readers"
//         ]
//       },
//       {
//         "category": "business",
//         "subCategory": [
//           "communication",
//           "project-management",
//           "human-resources",
//           "decentralized-business-tools"
//         ]
//       },
//       {
//         "category": "developer tools",
//         "subCategory": [
//           "discovery tool",
//           "developer infra"
//         ]
//       },
//       {
//         "category": "education",
//         "subCategory": [
//           "learning tools",
//           "reference",
//           "language-learning",
//           "stem"
//         ]
//       },
//       {
//         "category": "entertainment",
//         "subCategory": [
//           "music",
//           "video",
//           "video-streaming",
//           "music-streaming",
//           "live-events",
//           "nft-marketplaces"
//         ]
//       },
//       {
//         "category": "defi",
//         "subCategory": [
//           "banking",
//           "personal-finance",
//           "exchanges",
//           "insurance",
//           "on-ramping",
//           "off-ramping",
//           "payments",
//           "finance",
//           "airdrop tool",
//           "others",
//           "tooling",
//           "prediction markets",
//           "lending-and-borrowing",
//           "infrastructure"
//         ]
//       },
//       {
//         "category": "food and drink",
//         "subCategory": [
//           "cooking",
//           "recipes",
//           "restaurant-finding"
//         ]
//       },
//       {
//         "category": "games",
//         "subCategory": [
//           "action",
//           "adventure",
//           "puzzle",
//           "role-playing",
//           "strategy",
//           "racing",
//           "board ",
//           "simulation",
//           "word",
//           "metaverse"
//         ]
//       },
//       {
//         "category": "health and fitness",
//         "subCategory": [
//           "workout-apps",
//           "meditation",
//           "nutrition",
//           "sleep-trackers",
//           "medical"
//         ]
//       },
//       {
//         "category": "lifestyle",
//         "subCategory": [
//           "home-automation",
//           "fashion",
//           "dating"
//         ]
//       },
//       {
//         "category": "kids",
//         "subCategory": []
//       },
//       {
//         "category": "news",
//         "subCategory": [
//           "sports-news",
//           "magazines",
//           "decentralized-news-platforms",
//           "newspapers",
//           "live-news"
//         ]
//       },
//       {
//         "category": "photography",
//         "subCategory": [
//           "photo-editing",
//           "camera-apps",
//           "photo-sharing"
//         ]
//       },
//       {
//         "category": "productivity",
//         "subCategory": [
//           "note-taking",
//           "task-management",
//           "time-management",
//           "calendar",
//           "decentralized-collaboration-tools",
//           "graphics and design"
//         ]
//       },
//       {
//         "category": "shopping",
//         "subCategory": [
//           "ecommerce",
//           "nft-marketplaces",
//           "price aggregator"
//         ]
//       },
//       {
//         "category": "social networking",
//         "subCategory": [
//           "decentralized-social-networks",
//           "messaging"
//         ]
//       },
//       {
//         "category": "sports",
//         "subCategory": [
//           "team-management",
//           "live-scores"
//         ]
//       },
//       {
//         "category": "travel",
//         "subCategory": [
//           "navigation",
//           "accommodation-booking",
//           "transportation",
//           "trip-planning"
//         ]
//       },
//       {
//         "category": "utilities",
//         "subCategory": [
//           "file-management",
//           "browsers",
//           "security-and-privacy",
//           "wallets",
//           "weather"
//         ]
//       },
//       {
//         "category": "nft",
//         "subCategory": [
//           "art",
//           "pfps",
//           "domain names"
//         ]
//       },
//       {
//         "category": "gambling",
//         "subCategory": []
//       },
//       {
//         "category": "social",
//         "subCategory": [
//           "social media"
//         ]
//       },
//       {
//         "category": "personalization",
//         "subCategory": [
//           "themes",
//           "wallpapers",
//           "customization-tools"
//         ]
//       }
//     ]
//   }`;

var dappstoreMaping = `{
  "B2B": "business",

  "DAO": "productivity.decentralized-collaboration-tools",
  "DAO.DAO - Misc": "productivity.decentralized-collaboration-tools-misc",
  "DAO.Investing": "productivity.decentralized-collaboration-tools-investing",
  "DAO.Tooling": "productivity.decentralized-collaboration-tools-tools",

  "DeFi": "finance.defi",
  "DeFi.Decentralized Exchanges": "finance.exchanges",
  "DeFi.Derivatives, Perps, Trading": "finance.trading",
  "DeFi.Insurance": "finance.insurance",
  "DeFi.Lending and Borrowing": "finance.lending-and-borrowing",
  "DeFi.Liquid Staking": "finance.liquid-staking",
  "DeFi.Prediction Markets": "finance.prediction-markets",
  "DeFi.Real World Assets / Tokenization": "finance.tokenization",
  "DeFi.Stablecoins": "finance.stablecoins",
  "DeFi.Yield Aggregation / Farming": "finance.farming",
  "DeFi.DeFi - Other": "finance.others",

  "Education": "education",

  "Gaming": "games",
  "Gaming.Action and adventure games": "games.adventure",
  "Gaming.First-person action games": "games.action",
  "Gaming.Puzzle and strategy games": "games.puzzle",
  "Gaming.Role-playing games (RPG)": "games.role-playing",
  "Gaming.Simulation games": "games.simulation",
  "Gaming.Sports and racing games": "games.racing",
  "Gaming.Studios": "games.studios",

  "Infrastructure": "developer-tools.developer-infra",
  "Infrastructure.Analytics": "developer-tools.analytics",
  "Infrastructure.Bridges": "developer-tools.bridges",
  "Infrastructure.Identity": "developer-tools.identity",
  "Infrastructure.Indexer": "developer-tools.indexer",
  "Infrastructure.Node Infra": "developer-tools.node-infra",
  "Infrastructure.Oracles": "developer-tools.oracles",
  "Infrastructure.Payments": "finance.payments",
  "Infrastructure.Block Explorers": "developer-tools.block-explorer",
  "Infrastructure.Storage": "developer-tools.storage",

  "Metaverse": "games.metaverse",

  "NFT": "nft",
  "NFT.Art": "nft.art",
  "NFT.Domain Names": "nft.domain-names",
  "NFT.Marketplace": "nft.nft-marketplaces",
  "NFT.Music": "entertainment.music",
  "NFT.PFPs": "nft.peps",
  "NFT.Social Graph": "social-networking.social-graph",
  "NFT.Tooling / Infra": "nft.tooling",

  "Social": "social",

  "Tooling": "developer-tools",
  "Tooling.Block Explorers": "developer-tools.block-explorer",
  "Tooling.Front Ends": "developer-tools.front-ends",
  "Tooling.Indexer": "developer-tools.indexer",
  "Tooling.Monitoring": "developer-tools.monitoring",
  "Tooling.Security": "developer-tools.security",
  "Tooling.Storage": "developer-tools.storage",
  "Tooling.Messaging": "social-networking.messaging",
  "Tooling.Wallet": "utilities.wallets",

  "Utility": "utilities",
  
  "Infrastructure.On-Ramp/Off-Ramp": "finance.ramp"
}`;
// var merokuAPIData = JSON.parse(merokuJsonString).data;
var dappstoreMapingData = JSON.parse(dappstoreMaping);
// var merokuCategoryList: string[] = [];
var polygonMappedList: string[] = [];

// merokuAPIData.map((e) => merokuCategoryList.push(e.category));

(Object.values(dappstoreMapingData) as string[]).map((e) => {
  polygonMappedList.push(e.split(".")[0]);
});

// var othersList: string[] = merokuCategoryList.filter(
//   (value) => !polygonMappedList.includes(value.toLowerCase())
// );

interface CatSubCat {
  category: string | string[];
  subCategory?: string;
}

// Create a Map object to be passed
const customToMerokuMapping: Map<string, string> = new Map(
  Object.entries(JSON.parse(dappstoreMaping))
);

/**
 * mapping: A Map that contains mapping from custom's Category and Sub Category to Meroku's Category and Sub Category
 *
 */

const customToMerokuCategory = (
  category: string | string[] | undefined,
  merokuData: any,
  subCategory?: string | string[] | undefined
): CatSubCat => {
  let output: CatSubCat = { category: "" };
  var merokuCategoryList: string[] = [];

  if (merokuData !== undefined) {
    merokuData.data.map((e) => merokuCategoryList.push(e.category));
    var othersList: string[] = merokuCategoryList.filter(
      (value) => !polygonMappedList.includes(value.toLowerCase())
    );
    if (category === "Others") {
      output["category"] = othersList;
    }
  }

  const mapping = customToMerokuMapping;

  const key = subCategory
    ? [category, subCategory].join(".")
    : (category as string);
  const value = mapping.get(key);
  if (value) {
    const [c, sc] = value.split(".");
    output["category"] = c;
    if (sc) {
      output["subCategory"] = sc;
    }
  }

  return output;
};
// const getOthersCategoryList = (
//   merokuCategoryAPIData: Array<{
//     category: string,
//     subCategory: Array<string>
//   }>
// ): Array<string> => {
//   var merokuCategoryList: string[] = [];
//   merokuCategoryAPIData.map((e) => merokuCategoryList.push(e.category));
//   var othersList: string[] = merokuCategoryList.filter(
//     (value) => !polygonMappedList.includes(value.toLowerCase())
//   );
//   return othersList;
// };

export { polygonMappedList, customToMerokuCategory };
