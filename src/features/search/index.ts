import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { api } from "../../api/api";
import { ApiEndpoints, MEROKU_API_KEY } from "../../api/constants";
import { PagedResponse } from "../../models/response";
import { Dapp } from "../dapp/models/dapp";

interface ISearchDataSource {
  searchById;
  searchByPackageId;
}
// API calls for search and related things.
class SearchDataSource implements ISearchDataSource {
  registerEndpoints(this, api) {
    return api.injectEndpoints({
      endpoints: (build) => ({
        searchById: this.searchById(build),
        searchByPackageId: this.searchByPackageId(build),
      }),
    });
  }

  searchById(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, string>({
      query: (appId) => `/api/v1/dapp/search/${appId}`,
    });
  }

  searchByPackageId(builder: EndpointBuilder<any, any, any>) {
    return builder.query<PagedResponse<Dapp>, Array<string>>({

        query: (pkgIds) => ({
          url: `${ApiEndpoints.SEARCH_BY_PKG_ID}?packages=${pkgIds.join(",")}`,
          headers: {
            "apiKey": MEROKU_API_KEY
          }
        }),
    });
  }
}

export const searchDataSource = new SearchDataSource();

export const { useSearchByIdQuery, useSearchByPackageIdQuery } =
  searchDataSource.registerEndpoints(api);
