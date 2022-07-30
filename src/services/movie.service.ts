import {AxiosRes, axiosService} from "./axios.service";
import {IMovieDetails, IMovieList} from "../interfaces";
import {urls} from "../constants";

export  const movieService = {
    getAll: (): AxiosRes<IMovieList> => axiosService.get(urls.movies),
    getById: (id: string | undefined): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`)
}
