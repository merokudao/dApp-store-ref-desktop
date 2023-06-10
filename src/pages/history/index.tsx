import { AppList, PageLayout } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getApp } from "../../features/app/app_slice";
import { AppStrings } from "../constants";
import { Dapp } from "../../features/dapp/models/dapp";
//This class fetches browsing history from local storage

export default function HistoryPage(props) {
    const app = useSelector(getApp);
    const [history, setHistory] = useState();
    const [firstLoad, setFirstLoad] = useState<Boolean>(true);


    useEffect(() => {
        let text = localStorage.getItem('dApps')
        setFirstLoad(false);
        if (text) {
            setHistory(JSON.parse(text));
        }
    }, [])

    const buildLoadingItems = (count: number = 10) => {
        const _items: any[] = [];
        for (let i = 0; i < (count); i++) {
            _items.push(<div key={i} className="shimmer w-full h-[160px] rounded-lg" />)
        }
        return _items;
    }

    if (firstLoad) return <PageLayout>
        <div>
            <div className="bg-border-color w-[240px] h-[32px] my-4" />
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                {buildLoadingItems()}
            </div>
        </div>
    </PageLayout>

    return (
        <PageLayout>
            <h1 className="text-4xl mb-8 capitalize">{AppStrings.browsingHistory}</h1>
            {props.subtitle && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{'props.subtitle'}</h2>}
            <AppList data={(Object.values(history ?? {}) as Array<Dapp>).filter((dapp) => ((dapp.chains as Array<number>).indexOf(app.chainId) !== -1)).reverse()} />
        </PageLayout >
    )
}