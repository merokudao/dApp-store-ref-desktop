import { Dapp } from "../features/dapp/models/dapp";
import { Card, RImage as Image, Text } from "./index";
import Link from "next/link";

export function AppList(props) {
    return (
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
            {props.data.length ? props.data.map((app: Dapp) => <Card key={app.dappId}>
                <Link href={`/dapp?id=${app.dappId}`}>
                    <Image src={app.images.logo} width={64} height={64} className="rounded-lg" alt="" />
                    <p className="text-[24px] leading-[32px] font-[500] my-4">{app.name}</p>
                    <Text classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3' maxLines={3}>{app.description}</Text>
                </Link>
            </Card>) : <p className="text-xl">Oh No! We didnt find any dApps</p>}
        </div>
    )
}