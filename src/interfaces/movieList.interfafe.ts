import {IMovieCard} from "./movieCard.interface";

export interface IMovieList {
    page: number;
    results: IMovieCard[];
    total_pages: number;
    total_results: number;
}
