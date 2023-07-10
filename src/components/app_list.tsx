import classNames from "classnames";
import Link from "next/link";
import { ReactNode } from "react";
import { Dapp } from "../features/dapp/models/dapp";
import { spaceMono } from "../theme";
import { Card, RImage as Image, Text } from "./index";
import { Row } from "./layout/flex";

//tags on top of app card
export function Tag(props: { children: ReactNode }) {
	const _classNames = classNames({
		"text-[10px] leading-[10px] uppercase": true,
		"px-[6px] py-[4px]": true,
		"bg-[#212026]": true,
		"rounded-[10px]": true,
		[spaceMono.className]: true,
	});
	return <span className={_classNames}>{props.children}</span>;
}

const defaultRenderDapp = (app: Dapp) => (
	<Link href={`/dapp?id=${app.dappId}`} key={app.dappId}> <Card>
		{/* <Link href={}> */}
		<Row className="justify-between">
			<Image src={app.images.logo} width={64} height={64} className="rounded-lg" alt="" />
			<Row className="items-start gap-[6px]">
				{app.tags?.slice(0, 3).map((e) => <Tag>{e}</Tag>)}
			</Row>
		</Row>
		<p className="text-[24px] leading-[32px] font-[500] my-4">{app.name}</p>
		<Text classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3' maxLines={3}>
			{app.description}
		</Text>
		{/* </Link> */}
	</Card></Link>
);

// List of apps
export function AppList({
  className = 'grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3',
  renderDapp = defaultRenderDapp,
  ...props
}) {
  return (
	<div className={className}>
  	  {(props.data?.length ?? false)
	    ? props.data.map(renderDapp)
	    : <p className="text-xl">Oh No! We didnt find any dApps</p>}
	</div>
  );
}
