import { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {ApiEndpoints, BASE_URL, MEROKU_API_KEY} from "../../api/constants";
import { Analytics } from "./models/analytics";
import {GetServerSideProps} from "next";
import {Click} from "../../api/verida";
import {Dapp} from "../dapp/models/dapp";

//this is not being used
interface IAnalyticsDataSource {
	postAnalytics(build: EndpointBuilder<any, any, any>);
}

export class AnalyticsDataSource implements IAnalyticsDataSource {
	registerEndpoints(api) {
		api.injectEndpoints({
			endpoints: (build) => ({
				postAnalytics: this.postAnalytics(build),
			}),
		});
	}

	postAnalytics(build: EndpointBuilder<any, any, any>) {
		return build.mutation<Analytics, void>({
			query: () => ({
				url: ApiEndpoints.ANALYTICS,
				method: "POST",
				body: {
					analytics: {
						dappId: "com.axieinfinity.dapp",
						userAddress:
							"0x2bD7Fe74aA4E442b9EA407fBBEEe331840018465",
						metadata: {
							test: "dapp.testing.com",
						},
					},
				},
			}),
		});
	}
}

const analyticsDataSource = new AnalyticsDataSource();
export { analyticsDataSource };

export type VeridaExampleServerSideProps = {
  readonly clicks: readonly Click[];
  readonly dapps: readonly Dapp[];
};

export const veridaExampleServerSideProps: GetServerSideProps<VeridaExampleServerSideProps> = async () => {

	const [fetchClicks, fetchDapps] = await Promise.all([
		fetch(`${process.env.NEXT_PUBLIC_HOST_PATH}/api/clicks`),
		// TODO: fetch these more conventionally
		// TODO: these are a duplicate of pages/index.
		fetch(`${BASE_URL}/${ApiEndpoints.APP_LIST}?limit=10&page=1&chainId=137&orderBy=name:asc`, {
			method: 'GET',
			headers: {
				// HACK: This is a duplicate of api/api.ts.
				Accept: `application/json`,
				apikey: MEROKU_API_KEY ?? "",
			}
		}),
	]);

	const [{results: clicks}, {response: dapps}] = await Promise.all([
		fetchClicks.json(),
		fetchDapps.json(),
	]);

	const clickedDapps: readonly Dapp[] = [...new Set(clicks.map((click: Click) => click.dappId))]
		.flatMap((dappId): readonly Dapp[] => {
			const maybeMatchingDapp = (dapps || []).find(dapp => dapp.dappId === dappId);
			return maybeMatchingDapp ? [maybeMatchingDapp] : [];
		});

	return { props: { clicks, dapps: clickedDapps } }
}
