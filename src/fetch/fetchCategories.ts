export async function fetchCategories() {
	const res = await fetch(`https://api-a.meroku.store/dapp/categories`, {
		headers: {
			apiKey: process.env.NEXT_PUBLIC_MEROKU_API_KEY || "",
		},
	});
	const data = await res.json();
	return data;
}
