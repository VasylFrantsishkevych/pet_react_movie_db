import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {
    ICast, ICastResponse, IIndex,
    IMovieDetails,
    IMediaResponse,
    IMediaResults,
    IMovieVideoResponse,
    IMovieVideoResults
} from "../../interfaces";
import {mediaService} from "../../services";

interface IState {
    medias: IMediaResults[],
    moviesTrending: IMediaResults[],
    moviesDynamically: IMediaResults[],
    movieRecommendations: IMediaResults[],
    movieCasts: ICast[];
    movieId: IMovieDetails[],
    movieVideo: IMovieVideoResults[],
    status: boolean | null,
    errors: string | null | unknown,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    medias: [],
    moviesTrending: [],
    moviesDynamically: [],
    movieRecommendations: [],
    movieCasts: [],
    movieId: [],
    movieVideo: [],
    status: null,
    errors: null,
    currentPage: 1,
    totalPages: 0,
}

const getAll = createAsyncThunk<IMediaResponse, {id: string | undefined, page: string | null, type: keyof IIndex}>(
    'mediaSlice/getAll',
    async ({id, page,type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getAll(id, page, type);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMoviesDynamically = createAsyncThunk<IMediaResponse, {page: string | null, pathname: string}>(
    'mediaSlice/getMoviesDynamically',
    async ({page,pathname}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getMoviesDynamically(page, pathname);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getTrendingMovies = createAsyncThunk<IMediaResponse, void>(
    'genreSlice/getTrendingMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getTrending();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getRecommendations = createAsyncThunk<IMediaResponse, {id: number | undefined, type: keyof IIndex}>(
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

const getMovieById = createAsyncThunk<IMovieDetails[], string | undefined>(
    'mediaSlice/getMovieBtId',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getById(id);
            return [data]
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCastsMovie = createAsyncThunk<ICastResponse, {id: number | undefined, type: keyof IIndex}>(
    'mediaSlice/getCastsMovie',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await mediaService.getCasts(id, type)
            return data;
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)
const getMovieVideoById = createAsyncThunk<IMovieVideoResponse, {id: number | undefined, type: keyof IIndex}>(
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
            .addCase(getAll.rejected, (state, {payload}) => {
                state.errors = payload
            })
            .addCase(getMoviesDynamically.fulfilled, (state, {payload}) =>{
                const {page, results, total_pages} = payload;
                state.moviesDynamically = results;
                state.currentPage = page
                state.totalPages = total_pages
                state.status = false
            })
            .addCase(getTrendingMovies.fulfilled, (state, {payload}) => {
                state.moviesTrending = payload.results
                state.status = false
            })
            .addCase(getMovieById.fulfilled, (state, {payload}) => {
                state.movieId = payload
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
    getMovieById,
    getTrendingMovies,
    getMovieVideoById,
    getMoviesDynamically,
    getCastsMovie,
    getRecommendations,
}

export {
    mediaReducer,
    mediaAction,
}


