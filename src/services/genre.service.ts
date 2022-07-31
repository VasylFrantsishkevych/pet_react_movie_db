import {AxiosRes, axiosService} from "./axios.service";
import {IGenresList} from "../interfaces";
import {urls} from "../constants";

export const genreService = {
    getAll: (): AxiosRes<IGenresList> => axiosService.get(urls.genres)
}
