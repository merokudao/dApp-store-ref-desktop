export interface PagedResponse<T> {
    page:string,
    limit:number,
    pageCount:number,
    data: T[],
}


export interface PagedRequest {
    page: number,
    limit: number,
}

export interface CategoryListResponse {
    data: {
        category: string,
        subCategory: string,
    }[],
    message:string,
}