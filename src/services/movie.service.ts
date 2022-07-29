import {AxiosRes, axiosService} from "./axios.service";
import {IMovieCard, IMovieDetails} from "../interfaces";
import {urls} from "../constants";

export  const movieService = {
    getAll: (): AxiosRes<IMovieCard[]> => axiosService.get(urls.movies),
    getById: (id: number): AxiosRes<IMovieDetails> => axiosService.get(`${urls.movieId}/${id}`)
}
