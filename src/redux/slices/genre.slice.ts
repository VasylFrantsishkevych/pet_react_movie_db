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
    genre: IGenres | null,
    status: string | null,
    error: string | null
}

const initialState: IState = {
    genres: {
        genresMovie: [],
        genresTv: [],
    },
    genre: null,
    status: null,
    error: null
}

const getAll = createAsyncThunk<IGenresList, {mediaCategory: keyof IIndex}>(
    'genreSlice/getAll',
    async ({mediaCategory}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll(mediaCategory);
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
    reducers: {
        addGenre: (state, {payload}) => {
            state.genre = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAll.fulfilled, (state, {payload: {genres}, meta: {arg}}) => {
                if (arg.mediaCategory === category.movie) {
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

const {reducer: genreReducer, actions: {addGenre}} = genreSlice;

const genreActions = {
    getAll,
    addGenre
}

export {
    genreReducer,
    genreActions
}
