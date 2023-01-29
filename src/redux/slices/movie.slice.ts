import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {
    ICast, ICastResponse, IIndex,
    IMediaDetails,
    IMediaResponse,
    IMediaResults,
    IMovieVideoResponse,
    IMovieVideoResults
} from "../../interfaces";
import {mediaService} from "../../services";
import {category, movieType, tvType} from "../../constants";

interface IState {
    medias: IMediaResults[],
    mediaTrending: IMediaResults[],
    mediaDataByType: {
        moviePopular: IMediaResults[],
        movieTopRated: IMediaResults[],
        tvPopular: IMediaResults[],
        tvTopRated: IMediaResults[],
    },
    mediaSortedByType: IMediaResults[],
    mediaRecommendations: IMediaResults[],
    mediaCasts: ICast[];
    mediaById: IMediaDetails[],
    mediaVideo: IMovieVideoResults[],
    status: boolean | null,
    errors: string | null | unknown,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    medias: [],
    mediaTrending: [],
    mediaDataByType: {
        moviePopular: [],
        movieTopRated: [],
        tvPopular: [],
        tvTopRated: [],
    },
    mediaSortedByType: [],
    mediaRecommendations: [],
    mediaCasts: [],
    mediaById: [],
    mediaVideo: [],
    status: null,
    errors: null,
    currentPage: 1,
    totalPages: 0,
}

const getAll = createAsyncThunk<IMediaResponse, { id: string | undefined, page: string | null, categoryType: keyof IIndex }>(
    'mediaSlice/getAll',
    async ({id, page, categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getAll(id, page, categoryType);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMediaByType = createAsyncThunk<IMediaResponse, { categoryType: keyof IIndex, mediaType: string, page: string | null }>(
    'mediaSlice/getMediaByType',
    async ({categoryType, mediaType, page}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getMediaByType(categoryType, mediaType, page)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMediaSortByType = createAsyncThunk<IMediaResponse, { categoryType: keyof IIndex, mediaType: string, page: string | null }>(
    'mediaSlice/getMediaSortByType',
    async ({page, categoryType, mediaType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getMediaByType(categoryType, mediaType, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getTrending = createAsyncThunk<IMediaResponse, { categoryType: keyof IIndex, timeWindow: string }>(
    'genreSlice/getTrending',
    async ({categoryType, timeWindow}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getTrending(categoryType, timeWindow);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getRecommendations = createAsyncThunk<IMediaResponse, { id: string, categoryType: keyof IIndex }>(
    'mediaSlice/getRecommendations',
    async ({id, categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getRecommendation(id, categoryType)
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getById = createAsyncThunk<IMediaDetails[], { id: string | undefined, categoryType: keyof IIndex }>(
    'mediaSlice/getById',
    async ({id, categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getById(id, categoryType);
            return [data]
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCastsById = createAsyncThunk<ICastResponse, { id: string, categoryType: keyof IIndex }>(
    'mediaSlice/getCastsById',
    async ({id, categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getCastsById(id, categoryType)
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)
const getVideoById = createAsyncThunk<IMovieVideoResponse, { id: string, categoryType: keyof IIndex }>(
    'mediaSlice/getVideoById',
    async ({id, categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getVideoById(id, categoryType);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const mediaSlice = createSlice({
    name: 'mediaSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.medias = results
                state.currentPage = page
                state.totalPages = total_pages
                state.status = false
            })
            .addCase(getMediaByType.fulfilled, (state, {payload, meta: {arg}}) => {
                if (arg.categoryType === category.movie && arg.mediaType === movieType.popular) {
                    state.mediaDataByType.moviePopular = payload.results
                    state.status = false
                } else if (arg.categoryType === category.movie && arg.mediaType === movieType.topRated) {
                    state.mediaDataByType.movieTopRated = payload.results
                    state.status = false
                } else if (arg.categoryType === category.tv && arg.mediaType === tvType.popular) {
                    state.mediaDataByType.tvPopular = payload.results
                    state.status = false
                } else {
                    state.mediaDataByType.tvTopRated = payload.results
                    state.status = false
                }

            })
            .addCase(getAll.rejected, (state, {payload}) => {
                state.errors = payload
            })
            .addCase(getMediaSortByType.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.mediaSortedByType = results;
                state.currentPage = page
                state.totalPages = total_pages
                state.status = false
            })
            .addCase(getTrending.fulfilled, (state, {payload}) => {
                state.mediaTrending = payload.results
                state.status = false
            })
            .addCase(getById.fulfilled, (state, {payload}) => {
                state.mediaById = payload
                state.status = false
            })
            .addCase(getRecommendations.fulfilled, (state, {payload}) => {
                state.mediaRecommendations = payload.results
                state.status = false
            })
            .addCase(getCastsById.fulfilled, (state, {payload}) => {
                state.mediaCasts = payload.cast
                state.status = false
            })
            .addCase(getVideoById.fulfilled, (state, {payload}) => {
                state.mediaVideo = payload.results
                state.status = false
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1)
                state.status = type === 'pending';
            })
    }
})

const {reducer: mediaReducer} = mediaSlice;

const mediaAction = {
    getAll,
    getById,
    getTrending,
    getVideoById,
    getMediaSortByType,
    getCastsById,
    getRecommendations,
    getMediaByType,
}

export {
    mediaReducer,
    mediaAction,
}


