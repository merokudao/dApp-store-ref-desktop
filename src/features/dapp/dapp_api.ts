import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {CategoryListResponse, PagedRequest, PagedResponse} from "../../models/response";
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
    registerEndpoints(this, api) {
        return api.injectEndpoints({
            endpoints: (build) => ({
                getDappList: this.getAppList(build),
                getFeaturedList: this.getFeaturedList(build),
                getCategoryList: this.getCategoryList(build),
                getAppsInCategoryList: this.getAppsInCategoryList(build),
            })
        });
    }

    getAppList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, PagedRequest>({
            query: (args) => `${ApiEndpoints.APP_LIST}?limit=${args.limit}&page=${args.page}&chainId=137`,
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
        return builder.query<CategoryListResponse, string>({
            query: () => `${ApiEndpoints.APP_CATEGORIES_LIST}?chainId=137`,
        });
    }

    getAppsInCategoryList(builder: EndpointBuilder<any, any, any>) {
        return builder.query<PagedResponse<Dapp>, Array<string>>({
            query: (params) => (
                {
                    url: `/api/v1/dapp/search`,
                    params: params

                }),
        });
    }
}

export const dAppDataSource = new DappDataSource();


export const {
    useGetDappListQuery,
    useGetCategoryListQuery,
    useGetAppsInCategoryListQuery,
} = dAppDataSource.registerEndpoints(api);