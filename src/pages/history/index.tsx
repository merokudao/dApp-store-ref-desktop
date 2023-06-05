import { AppList, PageLayout } from "@/components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getApp } from "../../features/app/app_slice";
import { Dapp } from "../../features/dapp/models/dapp";
import { AppStrings } from "../constants";

export default function HistoryPage(props) {
<<<<<<< HEAD
	const app = useSelector(getApp);
	const [history, setHistory] = useState({});
	let text = localStorage.getItem("dApps");
	useEffect(() => {
		if (text) {
			setHistory(JSON.parse(text));
		}
		console.log(history);
	}, [text]);
	return (
		<PageLayout>
			<h1 className="text-4xl mb-8 capitalize">
				{AppStrings.browsingHistory}
			</h1>
			{props.subtitle && (
				<h2 className="text-[20px] leading-[28px]  mb-8 capitalize">
					{"props.subtitle"}
				</h2>
			)}
			<AppList
				data={(Object.values(history) as Array<Dapp>)
					.filter(
						(dapp) =>
							(dapp.chains as Array<number>).indexOf(
								app.chainId
							) !== -1
					)
					.reverse()}
			/>
		</PageLayout>
	);
}
=======
    const app = useSelector(getApp);
    const [history, setHistory] = useState({});
    
    useEffect(() => {
        let text = localStorage.getItem('dApps')
        if (text) {
            setHistory(JSON.parse(text));
        }
        console.log(history);
    }, [])
    return (
        <PageLayout>
            <h1 className="text-4xl mb-8 capitalize">{AppStrings.browsingHistory}</h1>
            {props.subtitle && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{'props.subtitle'}</h2>}
            <AppList data={(Object.values(history) as Array<Dapp>).filter((dapp) => ((dapp.chains as Array<number>).indexOf(app.chainId) !== -1)).reverse()} />

        </PageLayout>
    )
}
>>>>>>> a5d94fd (fixed build error)
