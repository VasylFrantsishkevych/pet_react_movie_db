import {AxiosRes, axiosService} from "./axios.service";
import {IMediaResponse} from "../interfaces";
import {searchUrls} from "../constants";

export const searchService = {
    getSearchMovie: (page: string | null, searchText: string): AxiosRes<IMediaResponse> => axiosService
        .get(`${searchUrls.searchMulti}?&language=en-US&query=${searchText}&include_adult=false`, {params: {page}})
}