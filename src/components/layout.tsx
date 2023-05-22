import { ConnectButton } from '@rainbow-me/rainbowkit';
import { default as NXTImage } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {App, posConfig, zkevmConfig} from "../app/constants.js";
import { useGetCategoryListQuery } from "../features/dapp/dapp_api";
import { AppStrings } from "../pages/constants";
import { Button, Card } from "./index";
import { Row } from "./layout/flex";
import {useDispatch, useSelector} from "react-redux";
import {setApp, setAppState} from "../features/app/app_slice";


function NavBar(props) {
    const app = useSelector(getApp);

    const dispatch = useDispatch();
    const router = useRouter();
    const onAppConfigClick = (app) => {
        dispatch(setApp(app))
        router.push('/')
    }
    const isActive = (config) => {
        if (app.title === config.title) {
            return "text-[#fff]";
        }
        return "";
    }
    return (
        <Row center className="py-4 px-10 border-b border-b-[#141217] bg-canvas-color px-4 py-2 md:py-4 md:px-10 gap-[16px]">
            <div className="flex-initial">
                <NavItem href="/" className="pr-[20px]">
                    <NXTImage width={App.logo.width} height={App.logo.height} src={App.logo.src} alt={`${App.name} Logo`} />
                </NavItem>
            </div>
            <div className="flex-grow flex gap-[16px] text-[14px] leading-[20px] font-[500] text-[#87868C]">
                <button className={isActive(posConfig)} onClick={() => onAppConfigClick(posConfig)}>{posConfig.title}</button>
                <button className={isActive(zkevmConfig)} onClick={() => onAppConfigClick(zkevmConfig)}>{zkevmConfig.title}</button>
            </div>
            <ConnectButton chainStatus="none" showBalance={false} />
        </Row>
    )
}

function NavItem(props) {
    return <Link href={props.href}
        className={"flex-initial py-4 text-[14px] text-[#67666E] hover:text-[#fff] font-[600]" + props.className}>{props.children}</Link>
}


function ExpansionPanel(props) {
    const [isExpanded, setExpanded] = useState<boolean>(false);
    const hasSubCategories = props.category.subCategory.length > 0;
    return (
        <details open={isExpanded} onToggle={() => setExpanded(!isExpanded)} className="pr-4">
            <summary>
                <div className="flex items-center justify-between">
                    <Link href={`/categories/?categories=${props.category.category}`}>
                        <p className="text-[20px] py-[10px] capitalize">{props.category.category}</p>
                    </Link>
                    {hasSubCategories &&
                      <div className={isExpanded ? "rotate-180" : ""}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9.5L12 15.5L18 9.5" stroke="#E2E1E6" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"/>
                        </svg>
                      </div>}
                </div>
            </summary>

            {hasSubCategories && props.category.subCategory.map((e) =>
                    (<div className="pl-5">
                        <Link href={`/categories/?categories=${props.category.category}&subCategory=${e}`}>
                            <p className="text-[16px] text-[#87868C] font-[500] py-[10px] hover:text-[#fff] capitalize">{e}</p>
                        </Link>
                    </div>)
                )
            }
        </details>
    )
}


function CategoryList(props) {
    const chainId = useSelector(getApp).chainId;

    const { data, isLoading, isError } = useGetCategoryListQuery({ chainId }, {
        refetchOnMountOrArgChange: false
    });

    if (isLoading) return <div className="mr-[16px]">
        <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
        <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
        <div className="shimmer w-full h-[48xp] mb-[16px] rounded-lg" />
        <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
        <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
        <div className="shimmer w-full h-[48xp] mb-[16px] rounded-lg" />
    </div>
    if (isError) return <p>Error</p>

    return (
        <ul>
            {data.data.map((e) => <ExpansionPanel category={e} key={JSON.stringify(e)} />)}
        </ul>
    )

}

//TOOD: RENAME
function Input(props) {
    const router = useRouter();
    const [value, setValue] = useState<string | Array<string>>(router.query.search || "");

    useEffect(() => {
        if (value) {
            router.push(`/search?search=${value}`, undefined, { shallow: true });
            document.getElementById("searchBar")?.focus();
        }
    }, [value, router])

    return (
        <div className={props.className}>
            <div className="relative">
                <div className="absolute w-[20px] h-[20px] top-[12px] left-[12px] align-middle">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.0259 13.8475L18.595 17.4158L17.4159 18.595L13.8475 15.0258C12.5198 16.0902 10.8684 16.6691 9.16669 16.6667C5.02669 16.6667 1.66669 13.3067 1.66669 9.16666C1.66669 5.02666 5.02669 1.66666 9.16669 1.66666C13.3067 1.66666 16.6667 5.02666 16.6667 9.16666C16.6691 10.8683 16.0902 12.5198 15.0259 13.8475ZM13.3542 13.2292C14.4118 12.1416 15.0024 10.6837 15 9.16666C15 5.94333 12.3892 3.33333 9.16669 3.33333C5.94335 3.33333 3.33335 5.94333 3.33335 9.16666C3.33335 12.3892 5.94335 15 9.16669 15C10.6837 15.0024 12.1416 14.4118 13.2292 13.3542L13.3542 13.2292Z"
                            fill="white" />
                    </svg>
                </div>
                <input value={value} id='searchBar'
                    onChange={(evt) => {
                        setValue(evt.target.value);
                    }}
                    className="w-full p-2 pl-[48px] bg-canvas-color border border-border-color rounded-lg"
                    type="search"
                    placeholder={AppStrings.searchDapps} />
            </div>
        </div>
    )
}

export function Hero(props) {
    const { title, subtitle, poster, video, button } = props;
    return (
        <>
            <div className="relative">
                <div className="bg-black bg-no-repeat bg-cover">
                    <Row className="min-h-[80vh] h-[80vh] justify-center flex-col-reverse md:flex-row md:justify-start items-center text-center md:text-left container z-10">
                        <div className="flex-initial w-full md:w-1/2">
                            <h1 className="text-[24px]  leading-[28px] md:text-[64px] md:leading-[72px] font-[500] mb-[24px]">{title}</h1>
                            <p className="w-full md:w-[70%] text-[16px] text-[#67666E] leading-[24px] font-[500] mb-[24px]">{subtitle}</p>
                            <Button>{button.text}</Button>
                        </div>
                        <div className="flex-initial sm:w-1/2 md:flex-grow">
                            <iframe src={`${video}?transparent=0&background=1&controls=1&autoplay=1&loop=1`}
                                className="w-full"
                                width={window.innerWidth / 2}
                                height={window.innerHeight / 2}
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen />
                        </div>
                    </Row>
                </div>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent z-0 pointer-events-none" />
            </div>
        </>
    )
}

function CategoryListSmall(props) {
    const { data } = props;
    const [openKey, setOpenKey] = useState();
    const [selected, setSelected] = useState()
    return (
        <Row className="lg:hidden overflow-scroll gap-[16px] py-[32px]">
            {data.data.map((e, index) => (
                <details key={JSON.stringify(e)} onToggle={() => setOpenKey(e.category)}>
                    <summary className="cursor-pointer bg-[#212026] rounded-[32px] flex justify-between items-center py-[8px] px-[12px]">
                        <div className="capitalize whitespace-nowrap text-[14px] leading-[21px]">{e.subCategory.includes(selected) ? selected : e.category}</div>
                        {(e.subCategory.length > 0) && (
                            <svg className="ml-[16px]" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9.5L12 15.5L18 9.5" stroke="#E2E1E6" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        )}
                    </summary>
                    {openKey === e.category && e.subCategory.length > 0 && <div className="cursor-pointer mt-[16px] inset-0" >
                        <Card>
                            {e.subCategory.map((e) => <p key={JSON.stringify(e)} onClick={() => setSelected(e)} className="capitalize whitespace-nowrap py-[12px] text-[14px] leading-[21px]">{e}</p>)}
                        </Card>
                    </div>}
                </details>
            ))
            }
        </Row>
    );
}

export function PageLayout(props) {
    const app = useSelector(getApp);
    const {
        data,
        isFetching,
        isLoading,
    } = useGetCategoryListQuery({
        chainId: app.chainId,
    }, {
        refetchOnMountOrArgChange: false
    });
    let child;
    if (isLoading || isFetching) {
        child = (<div className="mr-[16px]">
            <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
            <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
            <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
            <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg" />
        </div>)
    }
    // else if (!data.data) child= <h1>Error</h1>
    else {
        child = <CategoryList />;
    }
    return (
        <article className="container">
            <Row
                className="justify-between items-center py-8 md:border-b md:border-b-border-color flex-wrap lg:flex-nowrap gap-4">
                <div className="flex-initial w-full md:w-10/12">
                    <span className="text-[20px] leading-[27px] lg:text-[42px] lg:leading-[48px] font-[500]">{app.title}</span>
                </div>
                <div className="flex-initial w-full md:w-3/12">
                    <Input />
                </div>
            </Row>
            {data && <CategoryListSmall data={data} />}
            <Row className="items-start justify-start">
                <aside className="hidden lg:flex md:flex-initial w-3/12 border-r border-r-border-color">
                    <div className="w-full">
                        <div className="py-4 border-b border-b-border-color">
                            <Link href="/history">
                                <svg className="inline-block mr-4" width="24" height="25" viewBox="0 0 24 25"
                                    fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5M22 12.5C22 6.97715 17.5228 2.5 12 2.5M22 12.5H2M12 22.5C6.47715 22.5 2 18.0228 2 12.5M12 22.5C14.5013 19.7616 15.9228 16.208 16 12.5C15.9228 8.79203 14.5013 5.23835 12 2.5M12 22.5C9.49872 19.7616 8.07725 16.208 8 12.5C8.07725 8.79203 9.49872 5.23835 12 2.5M2 12.5C2 6.97715 6.47715 2.5 12 2.5"
                                        stroke="#E2E1E6" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <span className="text-xl">{AppStrings.browsingHistory}</span>
                            </Link>
                        </div>

                        <div className="py-4">
                            <Link href="/">
                                <span className="text-xl">{AppStrings.allDapps}</span>
                            </Link>
                        </div>
                        {child}
                    </div>
                </aside>
                <section className="flex-initial lg:w-9/12 lg:pl-8 md:pt-8">
                    {props.children}
                </section>
            </Row>
        </article>
    );
}

export default function Layout(props) {
    return (
        <>
            <div {...props}>
                <div className="fixed h-[70px] w-full z-20">
                    <NavBar />
                </div>
                <main className="relative top-[70px]">
                    {props.children}
                </main>
            </div>
        </>
    )
}
