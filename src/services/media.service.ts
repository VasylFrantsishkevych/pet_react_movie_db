import {AxiosRes, axiosService} from "./axios.service";
import {ICastResponse, IIndex, IMediaDetails, IMediaResponse, IMovieVideoResponse} from "../interfaces";
import {category, urls} from "../constants";

export const mediaService = {
    getAll: (id: string | undefined, page: string | null, type: keyof IIndex): AxiosRes<IMediaResponse> =>
        axiosService
            .get(`/discover/${category[type]}?&language=en-US&with_genres=${id}`, {params: {page}}),

    getTrending: (): AxiosRes<IMediaResponse> => axiosService.get(`${urls.moviesTrending}`),

    getMoviesDynamically: (page: string | null, pathname: string): AxiosRes<IMediaResponse> => axiosService
        .get(`${pathname}?&language=en-US`, {params: {page}}),

    getById: (id: string | undefined, type: keyof IIndex): AxiosRes<IMediaDetails> =>
        axiosService.get(`${category[type]}/${id}`),

    getCasts: (id: number | undefined, type: keyof IIndex): AxiosRes<ICastResponse> => axiosService
        .get(`${category[type]}/${id}/credits`),

    getSimilar: (id: number | undefined, type: keyof IIndex): AxiosRes<IMediaResponse> => axiosService
        .get(`${category[type]}/${id}/recommendations`),

    getVideoById: (id: number | undefined, type: keyof IIndex): AxiosRes<IMovieVideoResponse> => axiosService
        .get(`${category[type]}/${id}/videos?&language=en-US`),
}
