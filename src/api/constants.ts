export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const API_PATH = process.env.NEXT_PUBLIC_API_PATH;
export const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
export const WC_PROJECT_ID = process.env.WC_PROJECT_ID;

export const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
// export const BASE_URL = `${API_HOST}/${API_PATH}/${API_VERSION}`;

export const ApiEndpoints = {
    ANALYTICS: 'analytics',
    APP_LIST: 'dapp',
    APP_CATEGORIES_LIST: 'dapp/categories',
    CATEGORIES: 'categories',
    CATEGORY_APPS: 'categories/categorydapps',
    FEATURED: 'index/featured',
    SEARCH_BY_ID: 'dapp/searchById',
    SEARCH_BY_PKG_ID: 'dapp/queryWithPackageId',
    REVIEWS: 'reviews',
    RATING: 'dapp/rate',
    FETCH_USER: 'fetchuser',
    POST_USER: 'postuser',
}