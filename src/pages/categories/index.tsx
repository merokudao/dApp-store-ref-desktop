import { PageLayout } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import { AppList } from "../../components/app_list";
import { getApp } from "../../features/app/app_slice";
import { customToMerokuCategory } from "../../features/categories";
import { useGetCategoryListQuery, useGetInfiniteDappListQuery } from "../../features/dapp/dapp_api";
import Dapp from "../dapp";


function CategoriesList(props) {
    const router = useRouter();
    const limit = 10;
    const app = useSelector(getApp);
    const [page, setPage] = useState<number>(0);
    const [items, setItems] = useState<Array<typeof Dapp>>();
    const merokuData = useGetCategoryListQuery({});
    const [dataPage, setDataPage] = useState<number>(1);


    let categoryMapped = customToMerokuCategory(router.query.categories, merokuData.data, router.query.subCategory);

    useEffect(() => {
        if (merokuData) {
            categoryMapped = customToMerokuCategory(router.query.categories, merokuData.data, router.query.subCategory);
        }
    }, [merokuData])

    useEffect(() => {
        setPage(0)
    }, [router?.query?.categories, router?.query?.subCategory, router.query?.search])

    const {
        data,
        isFetching,
        isLoading,
    } = useGetInfiniteDappListQuery({
        search: router.query.search,
        categories: categoryMapped.category,
        subCategory: categoryMapped.subCategory,
        page: page + 1,
        limit,
        chainId: app.chainId,
        orderBy: router.query.search === undefined ? ["name:asc"] : []
    }, {
        refetchOnMountOrArgChange: false,
    });

    // since now data is being merge in RTK itself
    useEffect(() => {
        if (data) {
            console.log("data", data);
            setItems([...data?.response])
            setDataPage(data.page)
        }
    }, [data]);

    if (router.query.search !== undefined) {
        document.getElementById('searchBar')?.focus();
    }

    const handlePageChange = (pageData) => {
        console.log("On Page change", pageData)
        let selected = pageData.selected;
        setPage(selected);
        router.push('#allDappsScroll')

    }
    const buildLoadingItems = (count: number = 10) => {
        const _items: any[] = [];
        for (let i = 0; i < (count); i++) {
            _items.push(<div key={i} className="shimmer w-full h-[160px] rounded-lg" />)
        }
        return _items;
    }

    let child;
    if (router.query.categories === 'Others' || router.query.search) {
        if ((items === undefined) || (isLoading || isFetching) && (items.length === 0))
            return <PageLayout>
                <div>
                    <div className="bg-border-color w-[240px] h-[32px] my-4" />
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                        {buildLoadingItems()}
                    </div>
                </div>
            </PageLayout>
    }
    else {
        if ((items === undefined) || (isLoading || isFetching) && ((items.length === 0) || ((dataPage - 1) !== page) || ((items[0] as any)?.category !== categoryMapped.category) || (((items[0] as any)?.subCategory !== categoryMapped.subCategory) && categoryMapped.subCategory)))
            return <PageLayout>
                <div>
                    <div className="bg-border-color w-[240px] h-[32px] my-4" />
                    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                        {buildLoadingItems()}
                    </div>
                </div>
            </PageLayout>
    }
    console.log("data", data)
    console.log("page", page)

    child = (<AppList data={items}>
    </AppList>);
    return (
        <PageLayout>
            <h1 className="text-[24px] leading-[32px] lg:text-4xl mb-8 capitalize">{props.title || router.query.categories}</h1>

            {router.query.subCategory && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{router.query.subCategory}</h2>}
            {child}

            <div className='max-lg:mr-0 mr-20 my-10 justify-center flex flex-grow'>
                <ReactPaginate
                    containerClassName="max-md:text-[13px] text-[20px] max:md-flex"

                    pageClassName="items-center justify-between inline-block max-sm:px-1 px-2 py-1 border border-[#212026]"
                    pageLinkClassName="inline-block max-sm:px-1 px-2 py-1 m-1"

                    breakClassName="row-start-auto inline-block  max-sm:px-1 px-2 py-1 max-sm:m m-1"
                    breakLinkClassName="inline-block max-sm:px-1 px-2 py-1 max-sm:m m-1"

                    previousClassName={`items-center justify-between inline-block max-sm:px px-1 py-1  border border-[#212026]`}
                    previousLinkClassName={`inline-block max-sm:px-1 px-2 py-1 m-1 ${page == 0 ? 'text-[#212026]' : ''}`}

                    nextClassName={`items-center justify-between inline-block max-sm:px px-1 py-1  border border-[#212026]`}
                    nextLinkClassName={`inline-block max-sm:px-1 px-2 py-1  max-sm:m m-1 ${data.pageCount === page + 1 ? 'text-[#212026]' : ''}`}

                    activeClassName="bg-[#212026]"
                    breakLabel=".."
                    nextLabel="＞"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    forcePage={page}
                    pageCount={data.pageCount}
                    previousLabel="＜"
                    renderOnZeroPageCount={null}
                    marginPagesDisplayed={1}
                />
            </div>
        </PageLayout>
    )
}

export default CategoriesList;