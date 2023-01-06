import {AxiosRes, axiosService} from "./axios.service";
import {IMovieDetails, IMovieResponse} from "../interfaces";
import {urls} from "../constants";

export  const movieService = {
    getAll: (id: string | undefined, page: string | null): AxiosRes<IMovieResponse> => axiosService
        .get(`${urls.movies}?&language=en-US&with_genres=${id}`, {params: {page}}),
    getPopular: (): AxiosRes<IMovieResponse> => axiosService.get(`${urls.moviesPopular}`),
    getById: (id: string | undefined): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`),
}
