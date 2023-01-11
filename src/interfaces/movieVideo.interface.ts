export interface IMovieVideoResponse {
    id: number,
    results: IMovieVideoResults[],
}
export interface IMovieVideoResults {
    name: string,
    key: string,
    site: string,
    id: string,
}