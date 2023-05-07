import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {PagedResponse} from "../../models/response";
import {ApiEndpoints} from "../../api/constants";
import {api} from "../../api/api";
import {User} from "./models/user";
import {Dapp} from "../dapp/models/dapp";

interface IUserDataSource {
    getUser(builder)
    postUser(builder)
}

class UserDataSource implements IUserDataSource {
    registerEndpoints(this,api) {
        return api.injectEndpoints({
            endpoints: (build) => ({
                getUser: this.getUser(build),
                postUser: this.postUser(build),
            })
        });
    }
        getUser(builder:EndpointBuilder<any, any, any>) {
            return builder.query<User, string>({
                query: (walletAddress) => `${ApiEndpoints.FETCH_USER}?walletAddress=${walletAddress}`,
                transformResponse: (response, _, __) => {
                    let keys = Object.keys(response);
                    return {
                        name: response[keys[0]],
                        address: keys[0],
                    }
                },
            });
        }

        postUser(builder:EndpointBuilder<any, any, any>) {
            return builder.mutation<User, User>({
                query: (user) => ({
                    url: ApiEndpoints.POST_USER,
                    method: "POST",
                    body: {
                        [user.address]:user.name,
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

export {userDataSource};

