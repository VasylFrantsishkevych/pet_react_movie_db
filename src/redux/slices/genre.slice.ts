import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenres, IGenresList, IIndex} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";
import {category} from "../../constants";

interface IState {
    genres: {
        genresMovie: IGenres[],
        genresTv: IGenres[],
    },
    status: string | null,
    error: string | null
}

const initialState: IState = {
    genres: {
        genresMovie: [],
        genresTv: [],
    },
    status: null,
    error: null
}

const getAll = createAsyncThunk<IGenresList, {categoryType: keyof IIndex}>(
    'genreSlice/getAll',
    async ({categoryType}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll(categoryType);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
)

const genreSlice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, {payload: {genres}, meta: {arg}}) => {
                if (arg.categoryType === category.movie) {
                    state.genres.genresMovie = genres
                    state.status = null
                } else {
                    state.genres.genresTv = genres
                    state.status = null
                }

            })
            .addCase(getAll.pending, (state) => {
                state.status = 'pending'
            })
    }
});

const {reducer: genreReducer} = genreSlice;

const genreActions = {
    getAll,
}

export {
    genreReducer,
    genreActions
}
