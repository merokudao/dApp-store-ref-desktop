import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { AppList, PageLayout } from '../components';
import { getApp } from "../features/app/app_slice";
import { useGetInfiniteDappListQuery } from "../features/dapp/dapp_api";
import { AppStrings } from "./constants";
import Dapp from "./dapp";

const Index = (props) => {
    const router = useRouter();
    const app = useSelector(getApp);
    const limit = 10;
    const [page, setPage] = useState<number>(0);
    const [page2, setPage2] = useState<number>(0);
    const [dataPage, setDataPage] = useState<number>(1);

    const [items, setItems] = useState<Array<typeof Dapp>>();
    const {
        data,
        isFetching,
        isLoading,
    } = useGetInfiniteDappListQuery({
        page: (app.chainId === 137) ? page + 1 : page2 + 1,
        limit: limit,
        chainId: app.chainId,
        orderBy: ["name:asc"]
    }, {
        refetchOnMountOrArgChange: true,
    });

    const selectedPage = (app.chainId === 137) ? page : page2;

    useEffect(() => {
        if (data) {
            setItems([...data?.response] as any)
            setDataPage(data.page)
        }
    }, [data]);

    const buildLoadingItems = (count: number = 10) => {
        const _items: any[] = [];
        for (let i = 0; i < (count); i++) {
            _items.push(<div key={i} className="shimmer w-full h-[160px] rounded-lg" />)
        }
        return _items;
    }

    const handlePageChange = (pageData) => {
        console.log("On Page change", pageData)
        let selected = pageData.selected;
        app.chainId === 137 ? setPage(selected) : setPage2(selected);
        router.push('/#allDappsScroll')

    }

    let child;

    if ((items === undefined) || (isLoading || isFetching) && ((items.length === 0) || ((dataPage - 1) !== selectedPage) || ((items[0] as any).chains as Array<number>).indexOf(app.chainId) === -1))
        return <PageLayout>
            <div>
                <div className="bg-border-color w-[240px] h-[32px] my-4" />
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                    {buildLoadingItems(items?.length || 10)}
                </div>
            </div>
        </PageLayout>

    child = <AppList data={items} />;

    return (
        <>
            <PageLayout>
                <h1 className="text-4xl mb-8 capitalize">{AppStrings.allDapps}</h1>

                {child}
                <div className='max-lg:mr-0 mr-20 my-10 justify-center flex flex-grow'>
                    <ReactPaginate
                        containerClassName="max-md:text-[13px] text-[20px] flex"

                        pageClassName="items-center justify-between inline-block max-sm:px-1 px-2 py-1 border border-[#212026]"
                        pageLinkClassName="inline-block max-sm:px-1 px-2 py-1 m-1"

                        breakClassName="row-start-auto inline-block  max-sm:px-1 px-2 py-1 max-sm:m m-1"
                        breakLinkClassName="inline-block max-sm:px-1 px-2 py-1 max-sm:m m-1"

                        previousClassName={`items-center justify-between inline-block max-sm:px px-1 py-1  border border-[#212026]`}
                        previousLinkClassName={`inline-block max-sm:px-1 px-4 py-1 m-1 `}

                        nextClassName={`items-center justify-between inline-block max-sm:px px-1 py-1  border border-[#212026]`}
                        nextLinkClassName={`inline-block max-sm:px-1 px-4 py-1  max-sm:m m-1 `}

                        activeClassName="bg-[#212026]"
                        breakLabel=".."
                        nextLabel={<div className="mt-2" >
                            <svg className={data.pageCount === selectedPage + 1 ? 'stroke-[#212026]' : 'stroke-[#E2E1E6]'} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 13L7 7L1 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>}

                        onPageChange={handlePageChange}
                        pageRangeDisplayed={3}
                        forcePage={selectedPage}
                        pageCount={data.pageCount}
                        previousLabel={<div className="mt-2" >
                            <svg className={selectedPage == 0 ? 'stroke-[#212026]' : 'stroke-[#E2E1E6]'} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 13L1 7L7 1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </div>}
                        renderOnZeroPageCount={null}
                        marginPagesDisplayed={1}
                    />
                </div>
            </PageLayout>
        </>
    )
}

export default Index;