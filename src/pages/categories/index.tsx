import {useGetAppsInCategoryListQuery} from "../../features/dapp/dapp_api";
import {Dapp} from "../../features/dapp/models/dapp";
import {Card} from '../../features/dapp/presentation';
import {useRouter} from "next/router";
import {Image, Text} from "../../components";

function CategoriesList(props) {
    const router = useRouter();
    const {
        data,
        isFetching,
        isLoading,
    } = useGetAppsInCategoryListQuery({
        ...router.query
    }, {
        page:1,
        limit:12,
    },{
        refetchOnMountOrArgChange:true
    });

    const buildLoadingItems = () => {
        const _items = [];
        for (let i = 0; i < 8; i++) {
            _items.push((
                <div className="card p-4 w-full h-full bg-gradient-to-b from-[#141217] to-[#0E0C12] rounded-lg border border-gray-700">
                    <div className="bg-border-color w-[64px] h-[64px] rounded-lg" />
                    <div className="bg-border-color h-[24px] my-4"/>
                    <div className='bg-border-color h-[12px] mb-2 w-full'/>
                    <div className='bg-border-color h-[12px] mb-2 w-full'/>
                    <div className='bg-border-color h-[12px] mb-2 w-full'/>
                </div>
            ))
        }
        return _items;
    }

    if (isLoading || isFetching) return <div>
        <div className="bg-border-color w-[240px] h-[32px] my-4"/>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
            {buildLoadingItems()}
        </div>
    </div>
    if (!data.data.length) return <div>Missing post!</div>
    return (
        <>
            <h1 className="text-4xl mb-8 capitalize">{router.query.category}</h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
                {data.data?.map((app:Dapp) => <Card dapp={app} />)}
            </div>
        </>
    )
}

export default CategoriesList;