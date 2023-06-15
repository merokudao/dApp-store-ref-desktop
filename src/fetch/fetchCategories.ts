import { ApiEndpoints } from "../api/constants";

const MEROKU_BASE_URL = process.env.API_HOST;

export async function fetchCategories() {
	const res = await fetch(
		`${MEROKU_BASE_URL}/${ApiEndpoints.APP_CATEGORIES_LIST}`,
		{
			headers: {
				apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
			},
		}
	);
	const data = await res.json();
	return data;
}
