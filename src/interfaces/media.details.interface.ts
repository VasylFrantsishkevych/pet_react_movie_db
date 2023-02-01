import {IGenres} from "./genres.interface";
export interface IMediaDetails {
    backdrop_path: string,
    budget: number,
    genres: IGenres[],
    homepage: string,
    id: number,
    original_title: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_countries: [
        {
            iso_3166_1: string
        }
    ]
    release_date: string,
    first_air_date: string,
    runtime: number,
    vote_average: number,
    vote_count: number,
    number_of_seasons: number,
}
