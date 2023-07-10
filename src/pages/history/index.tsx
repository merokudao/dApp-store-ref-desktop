import { AppList, PageLayout } from "@/components";
import { useSelector } from "react-redux";
import { getApp } from "../../features/app/app_slice";
import { Dapp } from "../../features/dapp/models/dapp";
import { AppStrings } from "../constants";
import {GetServerSideProps} from "next";
import {Click} from "../../api/verida";
import {ApiEndpoints, BASE_URL, MEROKU_API_KEY} from "../../api/constants";

export const getServerSideProps: GetServerSideProps<{
  readonly clicks: readonly Click[];
  readonly dapps: readonly Dapp[];
}> = async () => {

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
        const maybeMatchingDapp = dapps.find(dapp => dapp.dappId === dappId);
        return maybeMatchingDapp ? [maybeMatchingDapp] : [];
      });

    return { props: { clicks, dapps: clickedDapps } }
}

export default function HistoryPage(props) {
    const app = useSelector(getApp);

    const {clicks, dapps: history} = props;

    return (
        <PageLayout>
            <h1 className="text-4xl mb-8 capitalize">{AppStrings.browsingHistory}</h1>
            <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">You're in control.</h2>
            <AppList
              clicks={clicks}
              data={(Object.values(history ?? {}) as Array<Dapp>)
                .filter((dapp) => ((dapp.chains as Array<number>).indexOf(app.chainId) !== -1))
                .reverse()}
            />
        </PageLayout >
    )
}
