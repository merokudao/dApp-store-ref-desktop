export interface PagedResponse<T> {
    page:string,
    limit:number,
    pageCount:number,
    response: T[],
}


export interface PagedRequest {
    page: number,
    limit: number,
}