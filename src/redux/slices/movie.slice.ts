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
    moviesDynamically: IMediaResults[],
    movieRecommendations: IMediaResults[],
    movieCasts: ICast[];
    mediaById: IMediaDetails[],
    movieVideo: IMovieVideoResults[],
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
    moviesDynamically: [],
    movieRecommendations: [],
    movieCasts: [],
    mediaById: [],
    movieVideo: [],
    status: null,
    errors: null,
    currentPage: 1,
    totalPages: 0,
}

const getAll = createAsyncThunk<IMediaResponse, { id: string | undefined, page: string | null, type: keyof IIndex }>(
    'mediaSlice/getAll',
    async ({id, page, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getAll(id, page, type);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMediaByType = createAsyncThunk<IMediaResponse, { categoryType: string, mediaType: string, page: string | null }>(
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

const getMoviesDynamically = createAsyncThunk<IMediaResponse, { page: string | null, pathname: string }>(
    'mediaSlice/getMoviesDynamically',
    async ({page, pathname}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getMoviesDynamically(page, pathname);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getTrending = createAsyncThunk<IMediaResponse, { typeMedia: keyof IIndex, timeWindow: string }>(
    'genreSlice/getTrendingMovies',
    async ({typeMedia, timeWindow}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getTrending(typeMedia, timeWindow);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getRecommendations = createAsyncThunk<IMediaResponse, { id: number | undefined, type: keyof IIndex }>(
    'mediaSlice/getSimilar',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getSimilar(id, type)
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getById = createAsyncThunk<IMediaDetails[], { id: string | undefined, type: keyof IIndex }>(
    'mediaSlice/getById',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getById(id, type);
            return [data]
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCastsMovie = createAsyncThunk<ICastResponse, { id: number | undefined, type: keyof IIndex }>(
    'mediaSlice/getCastsMovie',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getCasts(id, type)
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)
const getMovieVideoById = createAsyncThunk<IMovieVideoResponse, { id: number | undefined, type: keyof IIndex }>(
    'mediaSlice/getMovieVideoById',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getVideoById(id, type);
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
            .addCase(getMoviesDynamically.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.moviesDynamically = results;
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
                state.movieRecommendations = payload.results
                state.status = false
            })
            .addCase(getCastsMovie.fulfilled, (state, {payload}) => {
                state.movieCasts = payload.cast
                state.status = false
            })
            .addCase(getMovieVideoById.fulfilled, (state, {payload}) => {
                state.movieVideo = payload.results
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
    getMovieVideoById,
    getMoviesDynamically,
    getCastsMovie,
    getRecommendations,
    getMediaByType,
}

export {
    mediaReducer,
    mediaAction,
}


