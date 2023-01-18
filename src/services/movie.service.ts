import {AxiosRes, axiosService} from "./axios.service";
import {ICastResponse, IIndex, IMovieDetails, IMovieResponse, IMovieVideoResponse} from "../interfaces";
import {category, urls} from "../constants";
// @ts-ignore
export  const movieService = {
    getAll: (id: string | undefined, page: string | null): AxiosRes<IMovieResponse> => axiosService
        .get(`${urls.movies}?&language=en-US&with_genres=${id}`, {params: {page}}),

    getTrending: (): AxiosRes<IMovieResponse> => axiosService.get(`${urls.moviesTrending}`),

    getMoviesDynamically: (page: string | null, pathname: string): AxiosRes<IMovieResponse> => axiosService
        .get(`${pathname}?&language=en-US`, {params: {page}}),

    getById: (id: string | undefined): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`),
    
    getCasts: (id: number | undefined, type: keyof IIndex): AxiosRes<ICastResponse> => axiosService
        .get(`${category[type]}/${id}/credits`),

    getSimilar: (id: number | undefined, type: keyof IIndex): AxiosRes<IMovieResponse> => axiosService
        .get(`${category[type]}/${id}/similar`),

    getVideoById: (id: number | undefined): AxiosRes<IMovieVideoResponse> => axiosService
        .get(`${urls.movieId}/${id}/videos?&language=en-US`),
}
