export default interface WebStoreAPI<T> {
    getAppList(builder:any):T,
    searchById:Function,
    searchByPackageId:Function,
    getFeaturedList:Function,
    getCategoryList:Function,
    getAppsInCategoryList:Function,
    getAppReviews:Function,
    postAnalytics:Function,
    getUser:Function,
    postUser:Function,
}