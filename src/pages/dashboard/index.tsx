import * as React from 'react';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'


import {VeridaExampleServerSideProps, veridaExampleServerSideProps} from '../../features/analytics/analytics_api';
import {Row} from "../../components/layout/flex";
import {AppList, Card, RImage as Image, Text} from "../../components";
import {Dapp} from "../../features/dapp/models/dapp";
import {Tag} from "../../components/app_list";

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')

export const getServerSideProps = veridaExampleServerSideProps;

export default function Dashboard({
  clicks,
  dapps,
}: VeridaExampleServerSideProps): JSX.Element {
  return (
    <article className="container">
      <Row className="justify-between items-center py-8 md:border-b md:border-b-border-color flex-wrap lg:flex-nowrap gap-4 mb-8">
        <div className="flex-initial w-full md:w-10/12">
		    <span className="text-[20px] leading-[27px] lg:text-[42px] lg:leading-[48px] font-[500]">
            Dashboard
          </span>
        </div>
      </Row>
      <AppList
        className="grid gap-8 grid-cols-1"
        data={dapps}
        renderDapp={React.useCallback((dapp: Dapp) => {
          const {length: clickThroughCount} = clicks
            .filter(({dappId}) => dappId === dapp.dappId);
          const [maybeInsertedAt] = clicks
            .flatMap(({insertedAt})=> insertedAt ? [new Date(insertedAt)] : [])
            .sort((a, b) => b.getTime() - a.getTime());
          return (
            <Card key={dapp.dappId}>
              <Row className="justify-between my-4">
                <Image src={dapp.images.logo} width={64} height={64} className="rounded-lg" alt="" />
                <Row className="items-start gap-[6px]">
                  {dapp.tags?.slice(0, 3).map((e) => <Tag>{e}</Tag>)}
                </Row>
                <p className="text-[32px] leading-[32px] font-[500] my-4">{dapp.name}</p>
              </Row>
              <Text classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3' maxLines={3}>
                {dapp.description}
              </Text>
              <Row className="items-start justify-start mt-4">
                <aside className={`hidden 2xl:flex lg:flex md:flex-initial w-3/12 border-r border-r-border-color h-full`}>
                  <Text
                    children={`Click through count: ${clickThroughCount}`}
                    classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3'
                    maxLines={3}
                  />
                </aside>
                {Boolean(maybeInsertedAt) && (
                  <aside className={`hidden 2xl:flex lg:flex md:flex-initial w-9/12 h-full pl-4`}>
                    <Text classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3' maxLines={3}>
                      {`Last Impression: ${timeAgo.format(maybeInsertedAt)}`}
                    </Text>
                  </aside>
                )}
              </Row>
            </Card>
          );
        }, [clicks, dapps])}
      />
    </article>
  );
}
