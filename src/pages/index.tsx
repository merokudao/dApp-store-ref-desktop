import CategoryList from '../pages/categories';
import {AppList, Card, Hero, PageLayout,} from '../components';
import {AppStrings} from "./constants";
import {useRouter} from "next/router";
import {useGetAppsInCategoryListQuery, useGetDappListQuery} from "../features/dapp/dapp_api";
import {useEffect, useRef, useState} from "react";
import Dapp from "./dapp";

const Index = (props) => {
        const limit = 8;
        const [page, setPage] = useState<number>(1);
        const [items, setItems] = useState<Array<typeof Dapp>>([]);
        const {
            data,
            isFetching,
            isLoading,
        } = useGetDappListQuery({
            page:page,
            limit:limit,
        },{
            refetchOnMountOrArgChange:true
        });

        useEffect(() => {
            if (data) {
                setItems([...items, ...data?.response])
            }
        }, [data]);

        const observerTarget = useRef(null);


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

        const opt = {
            threshold: 1,
        };

        useEffect(() => {
            console.log('Using Effect')
            let {current} = observerTarget;
            console.log(observerTarget);
            const observer = new IntersectionObserver((entries) => {
                console.log(entries)
                if (entries[0].isIntersecting) {
                    setPage(page + 1);
                    console.log(page);
                }
            }, opt);
            if (current) observer.observe(current!);

            return () => {
                if (current) observer.unobserve(current!);
            };
    }, [observerTarget.current,  page]);

        let child;
        if ((isLoading || isFetching) && items.length === 0) return <PageLayout>
            <div>
                <div className="bg-border-color w-[240px] h-[32px] my-4"/>
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                    {buildLoadingItems()}
                </div>
            </div>
        </PageLayout>

        child = (<>
                <AppList data={items}/>
            </>
        );

    return (
        <>
            {/*<Hero*/}
            {/*    title="There are more dApps built #OnPolygon than ever before"*/}
            {/*    subtitle="The dApps in our ecosystem set the standard for privacy,security and content quality."*/}
            {/*    button={{text: 'Submit Your dApp'}}*/}
            {/*/>*/}
            <PageLayout>
                <p>{page}</p>
                <h1 className="text-4xl mb-8 capitalize">{AppStrings.allDapps}</h1>
                <div className="h-[54px] w-full"/>
                {child}
                <div ref={observerTarget} />
            </PageLayout>
        </>
    )
}

export default Index;