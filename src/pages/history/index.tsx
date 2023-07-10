import { AppList, PageLayout } from "@/components";
import { useSelector } from "react-redux";
import { getApp } from "../../features/app/app_slice";
import { Dapp } from "../../features/dapp/models/dapp";
import { AppStrings } from "../constants";

import {
  VeridaExampleServerSideProps,
  veridaExampleServerSideProps,
} from '../../features/analytics/analytics_api';
import {SliderButton} from "../../components/card";
import React from "react";
import {Row} from "../../components/layout/flex";
import {useRouter} from "next/router";

export const getServerSideProps = veridaExampleServerSideProps;

export default function HistoryPage(props: VeridaExampleServerSideProps) {
  const app = useSelector(getApp);

  const {clicks, dapps: history} = props;

  const router = useRouter();

  return (
    <PageLayout>
      <Row className="justify-between items-center my-[32px]">
        <h1 className="text-4xl mb-8 capitalize">{AppStrings.browsingHistory}</h1>
          <div>
            <SliderButton onClick={() => router.push('/dashboard')}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  d="M61.984,32.527L47.379,24.18C47.742,22.84,48,21.457,48,20c0-8.836-7.164-16-16-16s-16,7.164-16,16  c0,3.672,1.289,7.016,3.371,9.719L0.844,53.543c-1.359,1.746-1.043,4.258,0.699,5.613C2.274,59.727,3.141,60,3.997,60  c1.191,0,2.371-0.531,3.16-1.543L25.652,34.68C27.602,35.523,29.742,36,32,36c4.496,0,8.543-1.867,11.449-4.852l14.566,8.324  c1.918,1.102,4.359,0.426,5.457-1.488C64.572,36.066,63.902,33.625,61.984,32.527z"
                />
              </svg>
            </SliderButton>
          </div>
      </Row>
      <AppList
        clicks={clicks}
        data={(Object.values(history ?? {}) as Array<Dapp>)
          .filter((dapp) => ((dapp.chains as Array<number>).indexOf(app.chainId) !== -1))
          .reverse()}
      />
    </PageLayout >
  )
}
