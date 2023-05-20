import { useEffect, useState } from "react";
import { AppList, Card, Hero, PageLayout, } from '../components';
import { useGetInfiniteDappListQuery } from "../features/dapp/dapp_api";
import { AppStrings } from "./constants";
import Dapp from "./dapp";

const Index = (props) => {
        const limit = 8;
        const [page, setPage] = useState<number>(1);
        const [items, setItems] = useState<Array<typeof Dapp>>([]);
        const {
            data,
            isFetching,
            isLoading,
        } = useGetInfiniteDappListQuery({
            page:page,
            limit:limit,
        },{ 
            refetchOnMountOrArgChange:true,
        });
       
        // since now data is being merge in RTK itself
        useEffect(() => {
            if (data) {
                setItems([ ...data?.response])
            }
        }, [data]);

        // const observerTarget = useRef(null);

        const buildLoadingItems = () => {
            const _items : any[] =  [];
            for (let i = 0; i < (items.length || 10); i++) {
                _items.push(<div key={i} className="shimmer w-full h-[160px] rounded-lg" />)
            }
            return _items;
        }

        // const opt = {
        //     threshold: 1,
        // };

        // this one doesn't need to be refrished to listen to scroll events
        useEffect(() => {
            const onScroll = () => {
              const scrolledToBottom =
                window.innerHeight + window.scrollY + window.innerHeight/3 >= document.body.offsetHeight;
              if   (scrolledToBottom && !isFetching &&( page <( data?.pageCount || 0)) ) {
                console.log("Fetching more data...");
                setPage(page + 1);
              }
            };
        
            document.addEventListener("scroll", onScroll);
        
            return function () {
              document.removeEventListener("scroll", onScroll);
            };
          }, [page, isFetching]);

    //     useEffect(() => {
    //         console.log('Using Effect');
    //         let {current} = observerTarget;
    //         console.log("ObserverTarget",observerTarget);
    //         const observer = new IntersectionObserver(async (entries) => {
    //             console.log("Entries",entries);
    //             console.log("isLoading;",isLoading);
    //             console.log("isFetching;",isFetching);
    //             if ((!(isFetching || isLoading)) && entries[0].isIntersecting) {
    //                 setPage(page + 1);
    //                 console.log(page);
    //             }
    //         }, opt);
    //         if (current) observer.observe(current!);

    //         return () => {
    //             if (current) observer.unobserve(current!);
    //         };
    // }, [observerTarget.current,  page,isFetching]);

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
            <Hero
                title="There are more dApps built #OnPolygon than ever before"
                subtitle="The dApps in our ecosystem set the standard for privacy,security and content quality."
                button={{text: 'Submit Your dApp'}}
                // video={"https://player.vimeo.com/video/791153898?h=da72488da5"}
                video={"https://player.vimeo.com/video/791153931?h=969d328799"}
            />
            <PageLayout>
                <h1 className="text-4xl mb-8 capitalize">{AppStrings.allDapps}</h1>
                <div className="h-[54px] w-full"/>
                {child}
                {/* <div ref={observerTarget} /> */}
                {/* TODO add loader here */}
                <p>Loading more</p>
            </PageLayout>
        </>
    )
}

export default Index;