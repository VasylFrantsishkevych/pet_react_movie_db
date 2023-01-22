import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenres, IGenresList, IIndex} from "../../interfaces";
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

const getAll = createAsyncThunk<IGenresList, {type: keyof IIndex}>(
    'genreSlice/getAll',
    async ({type}, {rejectWithValue}) => {
        try {
            const {data} = await genreService.getAll(type);
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
            .addCase(getAll.fulfilled, (state, {payload: {genres}}) => {
                state.genres = genres
                state.status = null
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
