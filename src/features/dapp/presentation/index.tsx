import {Review} from "../models/review";
import {Dapp} from "../models/dapp";
import {useGetDappListQuery} from "../dapp_api";
import Link from "next/link";
import {Image, Text} from "../../../components";

export const FeaturedList = () => {
  return <>
      <h1>FeaturedList</h1>
  </>;
}

export const ReviewListTile = ({review}:{review:Review}) => {
    return <li>
        {review.dappId}
        {review.rating}
        {review.comment}
    </li>
}

export const Card = (props) => {
    const {name, description, images, dappId} = props.dapp;
    return (
        <Link href={`/dapp?id=${dappId}`}>
            <div className="card p-4 w-full h-full bg-gradient-to-b from-[#141217] to-[#0E0C12] rounded-lg border border-gray-700">
                <Image src={images.logo} width={64} height={64} className="rounded-lg" alt="" />
                <p className="text-[24px] leading-[32px] font-[500] my-4">{name}</p>
                <Text classNames='text-[16px] leading-[21px] text-[#87868C] font-[400] line-clamp-3' maxLines={3}>{description}</Text>
            </div>
        </Link>
    )
}


export const DappList = () => {
    const {
        data,
        isFetching,
        isLoading,
    } = useGetDappListQuery({
        page:1,
        limit:20,
    },{
        refetchOnMountOrArgChange:false
    });



    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing post!</div>

    return (
        <div>
            {data.response.map((app:Dapp) => <Card key={app.dappId} app={app} />)}
        </div>
    )
}
