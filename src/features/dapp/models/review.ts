export interface Review {
	dappId: string;
	rating: number;
	comment?: string;
	userId?: string | null;
	userName?: string;
	userAddress?: string;
}
