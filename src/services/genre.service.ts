import {AxiosRes, axiosService} from "./axios.service";
import {IGenresList, IIndex} from "../interfaces";
import {category} from "../constants";

export const genreService = {
    getAll: (type: keyof IIndex): AxiosRes<IGenresList> => axiosService.get(`/genre/${category[type]}/list`)
}
