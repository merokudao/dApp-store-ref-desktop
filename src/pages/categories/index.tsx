import {useGetAppsInCategoryListQuery} from "../../features/dapp/dapp_api";
import {Dapp} from "../../features/dapp/models/dapp";
import {Card} from '../../features/dapp/presentation';
import {useRouter} from "next/router";
import {Image, Text} from "../../components";
import {AppList} from "../../components/app_list";

function CategoriesList(props) {
    const router = useRouter();
    const limit = 8;
    const {
        data,
        isFetching,
        isLoading,
    } = useGetAppsInCategoryListQuery({
        ...router.query
    }, {
        page:1,
        limit:limit,
    },{
        refetchOnMountOrArgChange:true
    });


    const buildLoadingItems = () => {
        const _items = [];
        for (let i = 0; i < limit; i++) {
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


    let child;

    if (isLoading || isFetching) return <div>
        <div className="bg-border-color w-[240px] h-[32px] my-4"/>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
            {buildLoadingItems()}
        </div>
    </div>

    child = (<AppList data={data.data}>
    </AppList>);
    return (
    <>
        <h1 className="text-4xl mb-8 capitalize">{props.title || router.query.categories}</h1>
        {router.query.subCategory && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{router.query.subCategory}</h2>}
        {child}
    </>
    )
}

export default CategoriesList;