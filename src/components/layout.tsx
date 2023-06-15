import { ConnectButton } from "@rainbow-me/rainbowkit";
import { default as NXTImage } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { App } from "../app/constants";
import { getApp, setApp } from "../features/app/app_slice";
import {
	getPolygonCategoryList,
	useGetCategoryListQuery,
	useGetFeaturedDappsQuery,
} from "../features/dapp/dapp_api";
import { AppStrings } from "../pages/constants";
import { FeaturedCard, SliderButton } from "./card";
import { Button, Card } from "./index";
import { Row } from "./layout/flex";

function NavBar(props) {
	const app = useSelector(getApp);

	const dispatch = useDispatch();
	const router = useRouter();
	const onAppConfigClick = (app) => {
		dispatch(setApp(app));
		router.push("/");
	};
	const isActive = (config) => {
		if (app.title === config.title) {
			return "text-[#fff]";
		}
		return "";
	};
	return (
		<Row center className="flex w-full items-center px-10 gap-[16px]">
			<div className="flex-initial">
				<NavItem href="/" className="pr-[20px]">
					<NXTImage
						width={App.logo.width}
						height={App.logo.height}
						src={App.logo.src}
						style={{
							objectFit: "contain",
							height: App.logo.height,
						}}
						alt={`${App.name} Logo`}
					/>
				</NavItem>
			</div>
			<Input className="" />
			<div className="flex flex-row gap-x-4 items-center">
				<Button
					onClick={() => {
						window.gtag("event", "claim-app", {
							location: "header",
						});
					}}
				>
					<a target={"_blank"} href={"https://app.meroku.org"}>
						Submit App
					</a>
				</Button>
				<ConnectButton chainStatus="none" showBalance={false} />
			</div>
		</Row>
	);
}

function NavItem(props) {
	return (
		<Link
			href={props.href}
			className={
				"flex-initial py-4 text-[14px] text-[#67666E] hover:text-[#fff] font-[600]" +
				props.className
			}
		>
			{props.children}
		</Link>
	);
}

function ExpansionPanel(props) {
	const { open, onClick, category } = props;
	// const [isExpanded, setExpanded] = useState<boolean>(open);
	const isExpanded = open;
	const hasSubCategories = props.category.subCategory.length > 0;
	// console.log(open)
	return (
		<div onClick={() => onClick(category.category)} className="pr-4">
			<div className="flex items-center justify-between">
				<Link href={`/categories/?categories=${category.category}`}>
					<p className="text-[20px] py-[10px] capitalize">
						{category.category}
					</p>
				</Link>
				{hasSubCategories && (
					<div className={isExpanded ? "rotate-180" : ""}>
						<svg
							width="24"
							height="25"
							viewBox="0 0 24 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M6 9.5L12 15.5L18 9.5"
								stroke="#E2E1E6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				)}
			</div>

			{open &&
				hasSubCategories &&
				category.subCategory.map((e) => (
					<div className="pl-5">
						<Link
							href={`/categories/?categories=${category.category}&subCategory=${e}`}
						>
							<p className="text-[16px] text-[#87868C] font-[500] py-[10px] hover:text-[#fff] capitalize">
								{e}
							</p>
						</Link>
					</div>
				))}
		</div>
	);
}

function CategoryList(props) {
	// const chainId = useSelector(getApp).chainId;
	const data = getPolygonCategoryList();
	const [openKey, setOpenKey] = useState<string>("");
	// const {data, isLoading, isError} = useGetCategoryListQuery({chainId}, {
	//     refetchOnMountOrArgChange: false
	// });

	// if (isLoading) return <div className="mr-[16px]">
	//     <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg"/>
	//     <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg"/>
	//     <div className="shimmer w-full h-[48xp] mb-[16px] rounded-lg"/>
	//     <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg"/>
	//     <div className="shimmer w-full h-[48px] mb-[16px] rounded-lg"/>
	//     <div className="shimmer w-full h-[48xp] mb-[16px] rounded-lg"/>
	// </div>
	// if (isError) return <p>Error</p>

	return (
		<ul>
			{data.data.map((e) => (
				<ExpansionPanel
					open={openKey === e.category}
					onClick={(value) =>
						openKey === e.category
							? setOpenKey("")
							: setOpenKey(value)
					}
					category={e}
					key={e.category}
				/>
			))}
		</ul>
	);
}

//TOOD: RENAME
function Input(props) {
	const router = useRouter();
	const [value, setValue] = useState<string | Array<string>>(
		router.query.search || ""
	);

	const updateSearchString = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setValue(event.target.value as string);

		if (event.target.value.length === 0) {
			clearSearch();
		}
	};

	const clearSearch = () => {
		setValue("");
		if (value.length === 0) {
			router.push("/");
		}
	};

	const handleSearch = () => {
		if (value) {
			router.push(`/search?search=${value}`, undefined, {
				shallow: true,
			});
			//  document.getElementById("searchBar")?.focus({ preventScroll: true});
		}
	};

	return (
		<div className={props.className}>
			<div className="relative">
				<div className="absolute w-[20px] h-[20px] top-[12px] left-[12px] align-middle">
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.0259 13.8475L18.595 17.4158L17.4159 18.595L13.8475 15.0258C12.5198 16.0902 10.8684 16.6691 9.16669 16.6667C5.02669 16.6667 1.66669 13.3067 1.66669 9.16666C1.66669 5.02666 5.02669 1.66666 9.16669 1.66666C13.3067 1.66666 16.6667 5.02666 16.6667 9.16666C16.6691 10.8683 16.0902 12.5198 15.0259 13.8475ZM13.3542 13.2292C14.4118 12.1416 15.0024 10.6837 15 9.16666C15 5.94333 12.3892 3.33333 9.16669 3.33333C5.94335 3.33333 3.33335 5.94333 3.33335 9.16666C3.33335 12.3892 5.94335 15 9.16669 15C10.6837 15.0024 12.1416 14.4118 13.2292 13.3542L13.3542 13.2292Z"
							fill="#10182850"
						/>
					</svg>
				</div>
				<input
					value={value}
					id="searchBar"
					onChange={updateSearchString}
					onKeyUp={(e) => {
						if (e.key === "Enter") {
							handleSearch();
						}
					}}
					className="w-full p-2 pl-[48px] bg-canvas-color border border-border-color rounded-lg placeholder-[#10182850]"
					type="search"
					placeholder={AppStrings.searchDapps}
				/>
			</div>
		</div>
	);
}

export function Hero(props) {
	const { title, subtitle, video, button } = props;

	return (
		<>
			<div className="relative">
				<div
					className="bg-black bg-no-repeat bg-cover"
					style={{ backgroundImage: `url("/hero_bg.png")` }}
				>
					<Row className="min-h-[80vh] h-[80vh] justify-center flex-col-reverse md:flex-row items-center text-center container z-10">
						<div className="flex-initial w-full md:w-1/2">
							<h1 className="text-[24px]  leading-[28px] md:text-[64px] md:leading-[72px] font-[500] mb-[24px] text-[#FCFCFD]">
								{title}
							</h1>
							<Input className="mb-[24px]" />
						</div>
					</Row>
				</div>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent z-0 pointer-events-none" />
			</div>
		</>
	);
}

export function Footer(props) {
	const { text } = props;

	return (
		<div className="flex flex-col w-full items-center gap-y-4 my-8">
			<NXTImage
				width={119}
				height={20}
				src={App.logo.src}
				style={{
					objectFit: "contain",
					height: 20,
				}}
				alt={`${App.name} Logo`}
			/>
			<p className="text-sm text-center">{text}</p>
			<div className="flex flex-row gap-x-2">
				<button
					onClick={() => {
						window.open("https://twitter.com/meroku_org", "_blank");
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="feather feather-twitter"
					>
						<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
					</svg>
				</button>
				<button
					onClick={() => {
						window.open("https://github.com/merokudao", "_blank");
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						className="feather feather-github"
					>
						<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
					</svg>
				</button>
			</div>
		</div>
	);
}

//for mobile view
function CategoryListSmall(props) {
	const router = useRouter();
	const data = getPolygonCategoryList();
	const currentCategory = router.query.categories as string | undefined;
	const [openKey, setOpenKey] = useState<string>(currentCategory ?? "");

	const [selected, setSelected] = useState<string>(
		(router.query.subCategory as string | undefined) || ""
	);

	return (
		<Row className="lg:hidden overflow-scroll gap-[16px] py-[32px]">
			{data.data.map((e, index) => (
				<details
					key={JSON.stringify(e)}
					onToggle={() => {
						setOpenKey(e.category);
					}}
				>
					<summary className="cursor-pointer bg-[#212026] rounded-[32px] flex justify-between items-center py-[8px] px-[12px]">
						<Link href={`/categories/?categories=${e.category}`}>
							<div className="capitalize whitespace-nowrap text-[14px] leading-[21px]">
								{e.subCategory.includes(selected)
									? selected
									: e.category}
							</div>
						</Link>
						{e.subCategory.length > 0 ? (
							e.subCategory.includes(selected) ? (
								<svg
									className="ml-[16px]"
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									onClick={() => {
										router.push(
											`/categories/?categories=${data.data[0].category}`,
											undefined,
											{ shallow: true }
										);
										setSelected("");
										setOpenKey("");
									}}
								>
									<path
										d="M1 1L11 11M11 1L1 11"
										stroke="#E2E1E6"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							) : openKey === e.category ? (
								<svg
									className="ml-[16px]"
									width="18"
									height="18"
									viewBox="0 0 21 21"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 9.5L12 15.5L18 9.5"
										stroke="#E2E1E6"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							) : (
								<svg
									className="ml-[16px]"
									width="18"
									height="18"
									viewBox="0 0 21 21"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 9.5L12 15.5L18 9.5"
										stroke="#E2E1E6"
										stroke-width="2"
										stroke-linecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							)
						) : (
							<></>
						)}
					</summary>
					{openKey === e.category && e.subCategory.length > 0 && (
						<div className="cursor-pointer mt-[16px] inset-0">
							<Card>
								{e.subCategory.map((f) => {
									return (
										<p
											key={JSON.stringify(e)}
											onClick={() => {
												router.push(
													`/categories/?categories=${
														e.category
													}&subCategory=${f.toString()}`,
													undefined,
													{ shallow: true }
												);
												setSelected(f);
												setOpenKey("");
											}}
											className="capitalize whitespace-nowrap py-[12px] text-[14px] leading-[21px]"
										>
											{f}
										</p>
									);
								})}
							</Card>
						</div>
					)}
				</details>
			))}
		</Row>
	);
}

export function PageLayout(props) {
	const app = useSelector(getApp);

	return (
		<article className="container">
			{props.categoryList && (
				<CategoryListSmall data={props.categoryList} />
			)}

			<Row className="items-start justify-start">
				<aside className="hidden lg:flex md:flex-initial w-3/12 border-r border-r-border-color">
					<div className="w-full">
						<div className="py-4 border-b border-b-border-color">
							<Link href="/history">
								<svg
									className="inline-block mr-4"
									width="24"
									height="25"
									viewBox="0 0 24 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M22 12.5C22 18.0228 17.5228 22.5 12 22.5M22 12.5C22 6.97715 17.5228 2.5 12 2.5M22 12.5H2M12 22.5C6.47715 22.5 2 18.0228 2 12.5M12 22.5C14.5013 19.7616 15.9228 16.208 16 12.5C15.9228 8.79203 14.5013 5.23835 12 2.5M12 22.5C9.49872 19.7616 8.07725 16.208 8 12.5C8.07725 8.79203 9.49872 5.23835 12 2.5M2 12.5C2 6.97715 6.47715 2.5 12 2.5"
										stroke="#E2E1E6"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<span className="text-xl">
									{AppStrings.browsingHistory}
								</span>
							</Link>
						</div>
						<div className="py-4">
							<Link href="/">
								<span className="text-xl">
									{AppStrings.allDapps}
								</span>
							</Link>
						</div>
						<CategoryList />
						<div className="py-4 border-t border-b-border-color">
							<Footer text={app.footer.text} />
						</div>
					</div>
				</aside>
				<section className="flex-grow lg:w-9/12 lg:pl-8 md:pt-8">
					{props.children}
				</section>
			</Row>
		</article>
	);
}

export function FeaturedLayout(props) {
	const app = useSelector(getApp);
	const router = useRouter();
	const slider = useRef();
	let dragging = false;
	const settings = {
		dots: false,
		infinite: false,
		arrows: false,
		speed: 500,
		rows: 1,
		slidesToShow: 4.5,
		swipeToSlide: true,
		beforeChange: () => (dragging = true),
		afterChange: () => (dragging = false),
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2.15,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3.15,
				},
			},
		],
	};

	function buildLoadingCard(number: number) {
		let output = Array<React.JSX.Element>();
		for (let i = 0; i < number; i++) {
			output.push(
				<div className="shimmer h-[240px] lg:h-[320px] mb-[16px] rounded-lg" />
			);
		}
		return output;
	}

	return (
		<div>
			{router.asPath === "/" && (
				<section>
					<div className="container relative">
						<Row className="justify-between items-center my-[32px]">
							<h2 className="text-[24px] leading-[32px] lg:text-[60px] lg:leading-[72px] font-[500]">
								{AppStrings.featuredDapps}
							</h2>
							<div>
								<SliderButton
									onClick={() => {
										(slider?.current as any).slickPrev();
									}}
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M19 12L5 12M5 12L12 19M5 12L12 5"
											stroke="#101828"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</SliderButton>
								<SliderButton
									onClick={() => {
										(slider?.current as any).slickNext();
									}}
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M5 12H19M19 12L12 5M19 12L12 19"
											stroke="#101828"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</SliderButton>
							</div>
						</Row>
						<Slider ref={slider} {...settings}>
							{props.featuredList
								? props.featuredList.map((dapp) => (
										<Link
											key={app.dappId}
											href={`/dapp?id=${dapp.dappId}`}
											draggable={false}
											onClick={(e) =>
												dragging && e.preventDefault()
											}
										>
											<FeaturedCard app={dapp} />
										</Link>
								  ))
								: buildLoadingCard(5)}
						</Slider>
					</div>
				</section>
			)}
		</div>
	);
}

export default function Layout(props) {
	return (
		<>
			<div {...props}>
				<div className="fixed flex h-[70px] w-full z-20 items-center top-[0px] bg-canvas-color">
					<NavBar />
				</div>
				<main className="relative top-[70px]">{props.children}</main>
			</div>
		</>
	);
}
