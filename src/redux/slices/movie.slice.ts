import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IMovieCard, IMovieDetails} from "../../interfaces";
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

const getAllMovies = createAsyncThunk<IMovieCard[], void>(
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

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllMovies.fulfilled.type]: (state, action) => {
            state.status = 'fulfilled'
            state.movies = action.payload.results
        }
    }
})

const {reducer: movieReducer} = movieSlice;

const movieAction = {
    getAllMovies
}

export {
    movieReducer,
    movieAction
}


