import {AxiosRes, axiosService} from "./axios.service";
import {ICastResponse, IIndex, IMediaDetails, IMediaResponse, IMovieVideoResponse} from "../interfaces";
import {category} from "../constants";

export const mediaService = {
    getAll: (id: string | undefined, page: string | null, categoryType: keyof IIndex): AxiosRes<IMediaResponse> =>
        axiosService
            .get(`/discover/${category[categoryType]}?&language=en-US&with_genres=${id}`, {params: {page}}),

    getTrending: (categoryType: keyof IIndex, timeWindow: string): AxiosRes<IMediaResponse> =>
        axiosService.get(`/trending/${category[categoryType]}${timeWindow}`),

    getMediaByType: (categoryType: keyof IIndex, mediaType: string, page: string | null): AxiosRes<IMediaResponse> =>
        axiosService
            .get(`/${category[categoryType]}/${mediaType}`, {params: {page}}),

    getById: (id: string | undefined, categoryType: keyof IIndex): AxiosRes<IMediaDetails> =>
        axiosService.get(`/${category[categoryType]}/${id}`),

    getCastsById: (id: string, categoryType: keyof IIndex): AxiosRes<ICastResponse> => axiosService
        .get(`/${category[categoryType]}/${id}/credits`),

    getRecommendation: (id: string, categoryType: keyof IIndex): AxiosRes<IMediaResponse> => axiosService
        .get(`/${category[categoryType]}/${id}/recommendations`),

    getVideoById: (id: string, categoryType: keyof IIndex): AxiosRes<IMovieVideoResponse> => axiosService
        .get(`/${category[categoryType]}/${id}/videos?&language=en-US`),
}
