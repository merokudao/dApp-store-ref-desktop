import {
  EndpointBuilder,
  QueryDefinition,
} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { Dapp } from "../features/dapp/models/dapp";
import { Review } from "../features/dapp/models/review";
import { PagedResponse } from "../models/response";
import { ApiEndpoints } from "./constants";
import WebStoreAPI from "./interface";

export class RTKAPI
  implements WebStoreAPI<QueryDefinition<any, any, any, any>>
{
  getAppList(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: () => ApiEndpoints.APP_LIST,
    });
  }

  // New RTK added for infinite list, this one merger the data itself.
  // this should be used anywhere infinite scrolling is required
  getInfiniteAppList(builder: EndpointBuilder<any, any, any>) {
    return builder.query<any, string>({
      query: (args) => ({
        url: `${ApiEndpoints.APP_LIST}`,
        params: args,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        if (currentCache.response === undefined) {
          currentCache.response = newItems.response;
        } else {
          currentCache.response?.push(...newItems.response);
        }
        currentCache.page = newItems.page;
      },
    });
  }

  getFeaturedList(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: () => ApiEndpoints.FEATURED,
    });
  }

  getAppReviews(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Review>, string>({
      query: (appId) => `${ApiEndpoints.REVIEWS}?dappId=${appId}`,
    });
  }

  getAppsInCategoryList(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, Array<string>>({
      query: (categories) =>
        `${ApiEndpoints.CATEGORY_APPS}?categories=${categories.join(",")}`,
    });
  }

  getCategoryList(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: () => ApiEndpoints.CATEGORIES,
    });
  }

  searchById(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: (appId) => ApiEndpoints.SEARCH_BY_ID,
    });
  }

  searchByPackageId(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: (packageId) => ApiEndpoints.SEARCH_BY_PKG_ID,
    });
  }

  postAnalytics(builder: EndpointBuilder<any, any, any>) {
    return builder.mutation<PagedResponse<Dapp>, string>({
      query: () => ({
        url: ApiEndpoints.ANALYTICS,
        method: "POST",
        body: {},
      }),
    });
  }

  getUser(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: (walletAddress) =>
        `${ApiEndpoints.FETCH_USER}?walletAddress=${walletAddress}`,
    });
  }

  postUser(builder: EndpointBuilder<any, any, any>) {
    return builder.mutation<PagedResponse<Dapp>, string>({
      query: (username) => ({
        url: ApiEndpoints.POST_USER,
        method: "POST",
        body: {
          addr: username,
        },
      }),
    });
  }
}

const rtkAPI = new RTKAPI();

export { rtkAPI };
