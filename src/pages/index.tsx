import { AppList, Button, FeaturedLayout, PageLayout } from "../components";
import { Column } from "../components/layout/flex";
import { fetchApps } from "../fetch/fetchApps";
import { fetchCategories } from "../fetch/fetchCategories";
import { fetchFeatured } from "../fetch/fetchFeatured";
import { AppStrings } from "./constants";

const Index = ({ categoryList, featuredList, homePageApps }) => {
	return (
		<>
			<FeaturedLayout featuredList={featuredList} />
			<PageLayout categoryList={categoryList}>
				<h1 className="text-4xl mb-8 capitalize">
					{AppStrings.allDapps}
				</h1>
				<div className="h-[54px] w-full" />
				<AppList data={homePageApps} />
				<div className="w-full my-8">
					<Column className="flex items-center w-full gap-y-4">
						<p className="text-md text-center">
							You have seen a lot of apps. How about exploring
							specific categories?
						</p>

						<Button
							onClick={() => {
								window.scrollTo({
									top: 0,
									behavior: "smooth",
								});
							}}
						>
							Go to top
						</Button>
					</Column>
				</div>
			</PageLayout>
		</>
	);
};

export default Index;

export async function getStaticProps() {
	const categories = await fetchCategories();
	const featured = await fetchFeatured();
	const homePageApps = await fetchApps();

	return {
		props: {
			categoryList: categories,
			featuredList: featured,
			homePageApps: homePageApps,
		},
		revalidate: 86400, // revalidate once every day
	};
}
