import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {PagedRequest, PagedResponse} from "../../models/response";
import {Dapp} from "./models/dapp";
import {ApiEndpoints} from "../../api/constants";
import {api} from "../../api/api";
import {Review} from "./models/review";

interface IDappDataSource {
    getFeaturedList(builder: EndpointBuilder<any, any, any>),

    getAppList(builder: EndpointBuilder<any, any, any>),

    getDappReviews(builder: EndpointBuilder<any, any, any>),

    getCategoryList(builder: EndpointBuilder<any, any, any>),

    getAppsInCategoryList(builder: EndpointBuilder<any, any, any>),
}


export class DappDataSource implements IDappDataSource {
    registerEndpoints(this,api) {
        return api.injectEndpoints({
            endpoints: (build) => ({
                getDappList: this.getAppList(build),
                getFeaturedList: this.getFeaturedList(build),
                getCategories: this.getCategoryList(build),
            })
        });
    }

    getAppList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, PagedRequest>({
            query: (args) => `${ApiEndpoints.APP_LIST}?limit=${args.limit}&page=${args.page}`,
        });
    }

    getFeaturedList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, void>({
            query: () => ApiEndpoints.FEATURED,
        });
    }

    getDappReviews(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Review>, string>({
            query: (appId) => `${ApiEndpoints.REVIEWS}?dappId=${appId}`
        })
    }

    getCategoryList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, string>({
            query: () => ApiEndpoints.CATEGORIES,
        });
    }

    getAppsInCategoryList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, Array<string>>({
            query: (categories) => `${ApiEndpoints.CATEGORY_APPS}?categories=${categories.join(',')}`,
        });
    }
}

export const dAppDataSource = new DappDataSource();



export const {
    useGetDappListQuery
} = dAppDataSource.registerEndpoints(api);