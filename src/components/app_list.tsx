import {Dapp} from "../features/dapp/models/dapp";
import {Card} from "../features/dapp/presentation";

export function AppList(props) {
    return (
        <>
            {/*<h1 className="text-4xl mb-8 capitalize">{props.title}</h1>*/}
            {/*{props.subtitle && <h2 className="text-[20px] leading-[28px]  mb-8 capitalize">{props.subtitle}</h2>}*/}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 3xl:grid-cols-3">
                {props.data.length ? props.data.map((app: Dapp) => <Card dapp={app}/>) : <p className="text-xl">Oh No! We didnt find any dApps</p> }
            </div>
        </>)
}