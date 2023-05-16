import CategoriesList from "./categories";
import {Dapp} from "../features/dapp/models/dapp";
import {Card} from "../features/dapp/presentation";
import {useEffect, useState} from "react";

export default function HistoryPage(props) {
    const [history, setHistory] = useState({});
    useEffect(() => {
        let text = localStorage.getItem('dApps')
        if (text) {
            setHistory(JSON.parse(text));
        }

    }, [])
    return (
        <>
            <h1 className="text-4xl mb-8 capitalize">Browsing History</h1>
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                {Object.values(history).map((app:Dapp) => <Card dapp={app} />)}
            </div>
    </>
        )
}