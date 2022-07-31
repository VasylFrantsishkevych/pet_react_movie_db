import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenres, IGenresList} from "../../interfaces";
import {AxiosError} from "axios";
import {genreService} from "../../services";

interface IState {
    genres: IGenres[],
    genre: IGenres | null,
    status: string | null,
    error: string | null
}

const initialState: IState = {
    genres: [],
    genre: null,
    status: null,
    error: null
}

const getAllGenres = createAsyncThunk<IGenresList, void>(
    'genreSlice/getAllGenres',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll();
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
            .addCase(getAllGenres.fulfilled, (state, {payload: {genres}}) => {
                state.genres = genres
            })
    }
});

const {reducer: genreReducer, actions: {addGenre}} = genreSlice;

const genreActions = {
    getAllGenres,
    addGenre
}

export {
    genreReducer,
    genreActions
}
