export const API_HOST = process.env.REACT_APP_API_HOST;
export const API_PATH = process.env.REACT_APP_API_PATH;
export const API_VERSION = process.env.REACT_APP_API_VERSION;


export const BASE_URL = `${API_HOST}/${API_PATH}/${API_VERSION}`;

export const ApiEndpoints = {
    ANALYTICS: 'analytics',
    APP_LIST :'dapp',
    CATEGORIES: 'categories',
    CATEGORY_APPS:'categories/categorydapps',
    FEATURED :'index/featured',
    SEARCH_BY_ID: 'dapp/searchById',
    SEARCH_BY_PKG_ID: 'dapp/queryWithPackageId',
    REVIEWS: 'reviews',
    RATING:'dapp/rate',
    FETCH_USER: 'fetchuser',
    POST_USER: 'postuser',
}