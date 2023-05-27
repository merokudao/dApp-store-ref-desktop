let merokuJsonString = `{
    "message": "success",
    "data": [
      {
        "category": "books",
        "subCategory": [
          "ebooks",
          "audiobooks",
          "document-readers"
        ]
      },
      {
        "category": "business",
        "subCategory": [
          "communication",
          "project-management",
          "human-resources",
          "decentralized-business-tools"
        ]
      },
      {
        "category": "developer tools",
        "subCategory": [
          "discovery tool",
          "developer infra"
        ]
      },
      {
        "category": "education",
        "subCategory": [
          "learning tools",
          "reference",
          "language-learning",
          "stem"
        ]
      },
      {
        "category": "entertainment",
        "subCategory": [
          "music",
          "video",
          "video-streaming",
          "music-streaming",
          "live-events",
          "nft-marketplaces"
        ]
      },
      {
        "category": "defi",
        "subCategory": [
          "banking",
          "personal-finance",
          "exchanges",
          "insurance",
          "on-ramping",
          "off-ramping",
          "payments",
          "finance",
          "airdrop tool",
          "others",
          "tooling",
          "prediction markets",
          "lending-and-borrowing",
          "infrastructure"
        ]
      },
      {
        "category": "food and drink",
        "subCategory": [
          "cooking",
          "recipes",
          "restaurant-finding"
        ]
      },
      {
        "category": "games",
        "subCategory": [
          "action",
          "adventure",
          "puzzle",
          "role-playing",
          "strategy",
          "racing",
          "board ",
          "simulation",
          "word",
          "metaverse"
        ]
      },
      {
        "category": "health and fitness",
        "subCategory": [
          "workout-apps",
          "meditation",
          "nutrition",
          "sleep-trackers",
          "medical"
        ]
      },
      {
        "category": "lifestyle",
        "subCategory": [
          "home-automation",
          "fashion",
          "dating"
        ]
      },
      {
        "category": "kids",
        "subCategory": []
      },
      {
        "category": "news",
        "subCategory": [
          "sports-news",
          "magazines",
          "decentralized-news-platforms",
          "newspapers",
          "live-news"
        ]
      },
      {
        "category": "photography",
        "subCategory": [
          "photo-editing",
          "camera-apps",
          "photo-sharing"
        ]
      },
      {
        "category": "productivity",
        "subCategory": [
          "note-taking",
          "task-management",
          "time-management",
          "calendar",
          "decentralized-collaboration-tools",
          "graphics and design"
        ]
      },
      {
        "category": "shopping",
        "subCategory": [
          "ecommerce",
          "nft-marketplaces",
          "price aggregator"
        ]
      },
      {
        "category": "social networking",
        "subCategory": [
          "decentralized-social-networks",
          "messaging"
        ]
      },
      {
        "category": "sports",
        "subCategory": [
          "team-management",
          "live-scores"
        ]
      },
      {
        "category": "travel",
        "subCategory": [
          "navigation",
          "accommodation-booking",
          "transportation",
          "trip-planning"
        ]
      },
      {
        "category": "utilities",
        "subCategory": [
          "file-management",
          "browsers",
          "security-and-privacy",
          "wallets",
          "weather"
        ]
      },
      {
        "category": "nft",
        "subCategory": [
          "art",
          "pfps",
          "domain names"
        ]
      },
      {
        "category": "gambling",
        "subCategory": []
      },
      {
        "category": "social",
        "subCategory": [
          "social media"
        ]
      },
      {
        "category": "personalization",
        "subCategory": [
          "themes",
          "wallpapers",
          "customization-tools"
        ]
      }
    ]
  }`;

var polygonMapping = `{
	"Tooling": "developer tools",
	"Tooling.Security": "developer tools.security",
	"Tooling.Monitoring": "developer tools.monitoring",
	"Tooling.Storage": "developer tools.storage",
	"Tooling.Front Ends": "developer tools.front ends",
	"Tooling.Messaging": "social networking.messaging",
	"Tooling.Block Explorers": "developer tools.block explorers",
	"Tooling.Indexer": "developer tools.indexer",
	"Tooling.Wallet": "utilities.wallets",

    "Social": "social",

    "Infrastructure": "developer tools.developer infra",
	"Infrastructure.Oracles": "developer tools.oracles",
	"Infrastructure.Node Infra": "developer tools.node infra",
	"Infrastructure.Bridges": "developer tools.bridges",
	"Infrastructure.Identity": "developer tools.identity",
	"Infrastructure.Payments": "defi.payments",
	"Infrastructure.Analytics": "developer tools.analytics",

    "Metaverse": "games.metaverse",

    "Gaming": "games",
	"Gaming.Puzzle & strategy games": "games.puzzle",
	"Gaming.Action & adventure games": "games.adventure",
	"Gaming.First-person action games": "games.action",
	"Gaming.Role-playing games (RPG)": "games.role-playing",
	"Gaming.Sports & racing games": "games.racing",
	"Gaming.Simulation games": "games.simulation",
	"Gaming.Studios": "games.studios",

    "NFT": "nft",
	"NFT.Marketplace": "nft.marketplace",
	"NFT.Music": "entertainment.music",
	"NFT.Domain Names": "nft.domain names",
	"NFT.PFPs": "nft.peps",
	"NFT.Social Graph": "nft.social graph",
	"NFT.Art": "nft.art",
	"NFT.Tooling / Infra": "nft.tooling",

    "DAO": "productivity.decentralized-collaboration-tools",
	"DAO.Investing": "productivity.decentralized-collaboration-tools-investing",
	"DAO.Tooling": "productivity.decentralized-collaboration-tools-tools",
	"DAO.DAO - Misc": "productivity.decentralized-collaboration-tools-misc",

    "DeFi": "defi",
	"DeFi.Stablecoins": "defi.stablecoins",
	"DeFi.Decentralized Exchanges": "defi.exchanges",
	"DeFi.Lending & Borrowing": "defi.lending-and-borrowing",
	"DeFi.Liquid Staking": "defi.liquid staking",
	"DeFi.Yield Aggregation / Farming": "defi.farming",
	"DeFi.Real World Assets / Tokenization": "defi.tokenization",
	"DeFi.Insurance": "defi.insurance",
	"DeFi.Prediction Markets": "defi.product markets",
	"DeFi.DeFi - Other": "defi.others",

    "B2B": "business",

    "Utility": "utilities",

	"Infrastructure.On-Ramp/Off-Ramp": "defi.on-ramping, defi.off-ramping",

	"DeFi.Derivatives, Perps, Trading": "defi.trading"
}`;
var merokuAPIData = JSON.parse(merokuJsonString).data;
var polygonMappingData = JSON.parse(polygonMapping);
var merokuCategoryList: string[] = [];
var polygonMappedList: string[] = [];

merokuAPIData.map((e) => merokuCategoryList.push(e.category));

(Object.values(polygonMappingData) as string[]).map((e) => {
  polygonMappedList.push(e.split(".")[0]);
});

var othersList: string[] = merokuCategoryList.filter(
  (value) => !polygonMappedList.includes(value.toLowerCase())
);

interface CatSubCat {
  category: string;
  subCategory?: string;
}

// Create a Map object to be passed
const customToMerokuMapping: Map<string, string> = new Map(
  Object.entries(JSON.parse(polygonMapping))
);

/**
 * mapping: A Map that contains mapping from custom's Category and Sub Category to Meroku's Category and Sub Category
 *
 */
const customToMerokuCategory = (
  category: string | string[] | undefined,
  subCategory?: string | string[] | undefined
): CatSubCat => {
  const mapping = customToMerokuMapping;
  let output: CatSubCat = { category: "" };

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

export { polygonMappedList, customToMerokuCategory };
