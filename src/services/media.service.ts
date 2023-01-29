import {AxiosRes, axiosService} from "./axios.service";
import {ICastResponse, IIndex, IMediaDetails, IMediaResponse, IMovieVideoResponse} from "../interfaces";
import {category} from "../constants";

export const mediaService = {
    getAll: (id: string | undefined, page: string | null, categoryType: keyof IIndex): AxiosRes<IMediaResponse> =>
        axiosService
            .get(`/discover/${category[categoryType]}?&language=en-US&with_genres=${id}`, {params: {page}}),

    getTrending: (categoryType: keyof IIndex, timeWindow: string): AxiosRes<IMediaResponse> =>
        axiosService.get(`/trending/${category[categoryType]}${timeWindow}`),

    getMoviesDynamically: (page: string | null, pathname: string): AxiosRes<IMediaResponse> => axiosService
        .get(`${pathname}?&language=en-US`, {params: {page}}),

    getMediaByType: (categoryType: string, mediaType: string, page: string | null): AxiosRes<IMediaResponse> =>
        axiosService
            .get(`${categoryType}${mediaType}`, {params: {page}}),

    getById: (id: string | undefined, type: keyof IIndex): AxiosRes<IMediaDetails> =>
        axiosService.get(`${category[type]}/${id}`),

    getCastsById: (id: string, categoryType: keyof IIndex): AxiosRes<ICastResponse> => axiosService
        .get(`${category[categoryType]}/${id}/credits`),

    getRecommendation: (id: string, categoryType: keyof IIndex): AxiosRes<IMediaResponse> => axiosService
        .get(`${category[categoryType]}/${id}/recommendations`),

    getVideoById: (id: string, type: keyof IIndex): AxiosRes<IMovieVideoResponse> => axiosService
        .get(`${category[type]}/${id}/videos?&language=en-US`),
}
