import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovieCard, IMovieDetails, IMovieList} from "../../interfaces";
import {AxiosError} from "axios";
import {movieService} from "../../services";

interface IState {
    movies: IMovieCard[],
    movieId: IMovieDetails[],
    status: string | null,
    error: string | null,
    currentPage: number,
    totalPages: number
}

const initialState: IState = {
    movies: [],
    movieId: [],
    status: null,
    error: null,
    currentPage: 1,
    totalPages: 0,
}

const getAllMovies = createAsyncThunk<IMovieList, void>(
    'movieSlice/getAllMovies',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await movieService.getAll();
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

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllMovies.fulfilled, (state, {payload}) => {
                const {page, results, total_pages} = payload;
                state.movies = results
            })
            .addCase(getMovieById.fulfilled, (state, action) => {
                state.movieId = action.payload
            })
    }
})

const {reducer: movieReducer} = movieSlice;

const movieAction = {
    getAllMovies,
    getMovieById
}

export {
    movieReducer,
    movieAction
}


