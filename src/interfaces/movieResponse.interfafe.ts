import {IMovieResults} from "./movieResults.interface";

export interface IMovieList {
    page: number;
    results: IMovieResults[];
    total_pages: number;
    total_results: number;
}
