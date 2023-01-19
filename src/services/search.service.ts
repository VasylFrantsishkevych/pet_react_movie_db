import {AxiosRes, axiosService} from "./axios.service";
import {IMediaResponse} from "../interfaces";
import {urls} from "../constants";

export const searchService = {
    getSearchMovie: (page: string | null, searchText: string): AxiosRes<IMediaResponse> => axiosService
        .get(`${urls.search}?&language=en-US&query=${searchText}&include_adult=false`, {params: {page}})
}