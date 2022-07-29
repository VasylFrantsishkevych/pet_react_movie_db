import {IGenres} from "./genres.interface";
import {IProductionCompanies} from "./productionCompanies.interface";

export interface IMovieDetails {
    backdrop_path: string,
    budget: number,
    genres: IGenres[],
    homepage: string,
    id: number,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: IProductionCompanies[],
    release_date: string,
    runtime: number,
    vote_average: number,
    vote_count: number,
}
