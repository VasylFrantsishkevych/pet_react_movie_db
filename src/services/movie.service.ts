import {AxiosRes, axiosService} from "./axios.service";
import {IMovieDetails, IMovieResponse, IMovieVideoResponse} from "../interfaces";
import {urls} from "../constants";

export  const movieService = {
    getAll: (id: string | undefined, page: string | null): AxiosRes<IMovieResponse> => axiosService
        .get(`${urls.movies}?&language=en-US&with_genres=${id}`, {params: {page}}),

    getPopular: (): AxiosRes<IMovieResponse> => axiosService.get(`${urls.moviesPopular}`),

    getTopRated: (page: string | null): AxiosRes<IMovieResponse> => axiosService
        .get(`${urls.moviesTopRated}?&language=en-US`, {params: {page}}),

    getById: (id: string | undefined): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`),

    getVideoById: (id: number | undefined): AxiosRes<IMovieVideoResponse> => axiosService
        .get(`${urls.movieId}/${id}/videos?&language=en-US`),
}
