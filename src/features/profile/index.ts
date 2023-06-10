import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { ApiEndpoints, MEROKU_API_KEY } from "../../api/constants";
import { api } from "../../api/api";
import { User } from "./models/user";

interface IUserDataSource {
    getUser(builder)
    postUser(builder)
}
// API calls for getting user data for custom middleware backend.
// not being used though.
class UserDataSource implements IUserDataSource {
    registerEndpoints(this, api) {
        return api.injectEndpoints({
            endpoints: (build) => ({
                getUser: this.getUser(build),
                postUser: this.postUser(build),
            })
        });
    }
    getUser(builder: EndpointBuilder<any, any, any>) {
        return builder.query<User, string>({
            query: (walletAddress) => ({
                url: `${ApiEndpoints.FETCH_USER}?walletAddress=${walletAddress}`,
                headers: {
                  "apiKey": MEROKU_API_KEY
                }
              }),

            transformResponse: (response, _, __) => {
                let keys = Object.keys(response);
                return {
                    name: response[keys[0]],
                    address: keys[0],
                }
            },
        });
    }

    postUser(builder: EndpointBuilder<any, any, any>) {
        return builder.mutation<User, User>({
            query: (user) => ({
                url: ApiEndpoints.POST_USER,
                headers: {
                    "apiKey": MEROKU_API_KEY
                },
                method: "POST",
                body: {
                    [user.address]: user.name,
                }
            }),
        });
    }
}

const userDataSource = new UserDataSource();


export const {
    useGetUserQuery,
    usePostUserMutation,
} = userDataSource.registerEndpoints(api);

export { userDataSource };

