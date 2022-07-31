import {AxiosRes, axiosService} from "./axios.service";
import {IMovieDetails, IMovieList} from "../interfaces";
import {urls} from "../constants";

export  const movieService = {
    getAll: (id: string | undefined, page: string | null): AxiosRes<IMovieList> => axiosService
        .get(`${urls.movies}?&language=en-US&with_genres=${id}`, {params: {page}}),
    getById: (id: string | undefined): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`)
}
