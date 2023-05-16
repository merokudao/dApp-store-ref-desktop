import CategoriesList from "./categories";
import {Dapp} from "../features/dapp/models/dapp";
import {Card} from "../features/dapp/presentation";
import {useEffect, useState} from "react";
import {AppList} from "../components/app_list";
import {PageLayout} from "../components";

export default function HistoryPage(props) {
    const [history, setHistory] = useState({});
    useEffect(() => {
        let text = localStorage.getItem('dApps')
        if (text) {
            setHistory(JSON.parse(text));
        }

    }, [])
    return (
        <PageLayout>
            <h1 className="text-4xl mb-8 capitalize">Browsing History</h1>
            {props.subtitle && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{'props.subtitle'}</h2>}
            <AppList data={Object.values(history)} />
        </PageLayout>
        )
}