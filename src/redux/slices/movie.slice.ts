import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {
    ICast, ICastResponse, IIndex,
    IMovieDetails,
    IMovieResponse,
    IMovieResults,
    IMovieVideoResponse,
    IMovieVideoResults
} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovieResults[],
    moviesTrending: IMovieResults[],
    moviesDynamically: IMovieResults[],
    movieSimilar: IMovieResults[],
    movieCasts: ICast[];
    movieId: IMovieDetails[],
    movieVideo: IMovieVideoResults | null,
    status: boolean | null,
    errors: string | null | unknown,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    movies: [],
    moviesTrending: [],
    moviesDynamically: [],
    movieSimilar: [],
    movieCasts: [],
    movieId: [],
    movieVideo: null,
    status: null,
    errors: null,
    currentPage: 1,
    totalPages: 0,
}

const getAllMovies = createAsyncThunk<IMovieResponse, {id: string | undefined, page: string | null}>(
    'movieSlice/getAllMovies',
    async ({id, page}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll(id, page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMoviesDynamically = createAsyncThunk<IMovieResponse, {page: string | null, pathname: string}>(
    'movieSlice/getMoviesDynamically',
    async ({page,pathname}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getMoviesDynamically(page, pathname);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getTrendingMovies = createAsyncThunk<IMovieResponse, void>(
    'genreSlice/getTrendingMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getTrending();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getSimilar = createAsyncThunk<IMovieResponse, {id: number | undefined, type: keyof IIndex}>(
    'movieSlice/getSimilar',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getSimilar(id, type)
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getMovieById = createAsyncThunk<IMovieDetails[], string | undefined>(
    'movieSlice/getMovieBtId',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getById(id);
            return [data]
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const getCastsMovie = createAsyncThunk<ICastResponse, {id: number | undefined, type: keyof IIndex}>(
    'movieSlice/getCastsMovie',
    async ({id, type}, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getCasts(id, type)
            return data;
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)
const getMovieVideoById = createAsyncThunk<IMovieVideoResponse,  number | undefined >(
    'movieSlice/getMovieVideoById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getVideoById(id);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllMovies.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.movies = results
                state.currentPage = page
                state.totalPages = total_pages
                state.status = false
            })
            .addCase(getAllMovies.rejected, (state, {payload}) => {
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
            .addCase(getSimilar.fulfilled, (state, {payload}) => {
                state.movieSimilar = payload.results
                state.status = false
            })
            .addCase(getCastsMovie.fulfilled, (state, {payload}) => {
                state.movieCasts = payload.cast
                state.status = false
            })
            .addCase(getMovieVideoById.fulfilled, (state, {payload}) => {
                state.movieVideo = payload.results[0]
                state.status = false
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1)
                state.status = type === 'pending';
            })
    }
})

const {reducer: movieReducer} = movieSlice;

const movieAction = {
    getAllMovies,
    getMovieById,
    getTrendingMovies,
    getMovieVideoById,
    getMoviesDynamically,
    getCastsMovie,
    getSimilar,
}

export {
    movieReducer,
    movieAction
}


