import CategoryList from '../pages/categories';
import {AppList, Card, Hero, PageLayout,} from '../components';
import {AppStrings} from "./constants";
import {useRouter} from "next/router";
import {useGetAppsInCategoryListQuery, useGetDappListQuery} from "../features/dapp/dapp_api";

const Index = (props) => {
        const limit = 8;
        const {
            data,
            isFetching,
            isLoading,
        } = useGetDappListQuery({
            page:1,
            limit:limit,
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
        <>
            <Hero
                title="There are more dApps built #OnPolygon than ever before"
                subtitle="The dApps in our ecosystem set the standard for privacy,security and content quality."
                button={{text: 'Submit Your dApp'}}
            />
            <PageLayout>
                <h1 className="text-4xl mb-8 capitalize">{AppStrings.allDapps}</h1>
                {child}
            </PageLayout>
        </>
    )
}

export default Index;