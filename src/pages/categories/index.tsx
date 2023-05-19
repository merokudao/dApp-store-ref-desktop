import {useGetAppsInCategoryListQuery, useGetDappListQuery} from "../../features/dapp/dapp_api";
import {useRouter} from "next/router";
import {PageLayout, Text, Card} from "@/components";
import {AppList} from "../../components/app_list";

function CategoriesList(props) {
    const router = useRouter();
    const limit = 8;
    const {
        data,
        isFetching,
        isLoading,
    } = useGetDappListQuery({
        ...router.query
    }, {
        page:1,
        limit:8,
    },{
        refetchOnMountOrArgChange:true
    });


    const buildLoadingItems = () => {
        const _items = [];
        for (let i = 0; i < limit; i++) {
            _items.push(<Card>
                <div className="bg-border-color w-[64px] h-[64px] rounded-lg" />
                <div className="bg-border-color h-[24px] my-4"/>
                <div className='bg-border-color h-[12px] mb-2 w-full'/>
                <div className='bg-border-color h-[12px] mb-2 w-full'/>
                <div className='bg-border-color h-[12px] mb-2 w-full'/>
            </Card>)
        }
        return _items;
    }


    let child;

    if (isLoading || isFetching) return <PageLayout>
        <div>
            <div className="bg-border-color w-[240px] h-[32px] my-4"/>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                {buildLoadingItems()}
            </div>
        </div>
    </PageLayout>

    child = (<AppList data={data.response}>
    </AppList>);
    return (
    <PageLayout>
        <h1 className="text-[24px] leading-[32px] lg:text-4xl mb-8 capitalize">{props.title || router.query.categories}</h1>
        {router.query.subCategory && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{router.query.subCategory}</h2>}
        {child}
    </PageLayout>
    )
}

export default CategoriesList;