import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovieDetails, IMovieResponse, IMovieResults, IMovieVideoResponse, IMovieVideoResults} from "../../interfaces";
import {movieService} from "../../services";

interface IState {
    movies: IMovieResults[],
    moviesPopular: IMovieResults[],
    moviesDynamically: IMovieResults[],
    movieId: IMovieDetails[],
    movieVideo: IMovieVideoResults | null,
    status: boolean | null,
    errors: string | null | unknown,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    movies: [],
    moviesPopular: [],
    moviesDynamically: [],
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

const getPopularMovies = createAsyncThunk<IMovieResponse, void>(
    'genreSlice/getPopularMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getPopular();
            return data
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
            .addCase(getPopularMovies.fulfilled, (state, {payload}) => {
                state.moviesPopular = payload.results
                state.status = false
            })
            .addCase(getMovieById.fulfilled, (state, {payload}) => {
                state.movieId = payload
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
    getPopularMovies,
    getMovieVideoById,
    getMoviesDynamically,
}

export {
    movieReducer,
    movieAction
}


