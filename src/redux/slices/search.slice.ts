import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IMediaResponse, IMediaResults} from "../../interfaces";
import {searchService} from "../../services";

interface IState {
    searchMovie: IMediaResults[],
    searchText: string,
    status: boolean | null,
}

const initialState: IState ={
    searchMovie: [],
    searchText: '',
    status: null,
}

const getSearchMovie = createAsyncThunk<IMediaResponse, {page: string | null, searchText: string}>(
    'searchSlice/getSearchMovie',
    async ({page, searchText}, {rejectWithValue}) => {
        try {
            const {data} = await searchService.getSearchMovie(page, searchText)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    }
);

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        addSearchText: (state, {payload}) => {
            state.searchText = payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getSearchMovie.fulfilled, (state, {payload}) => {
                state.searchMovie = payload.results
                state.status = false
            })
            .addDefaultCase((state, action) => {
                const [type] = action.type.split('/').splice(-1)
                state.status = type === 'pending';
            })
    }
})

const {reducer: searchReducer, actions: {addSearchText}} = searchSlice;

const searchAction = {
    addSearchText,
    getSearchMovie,
}

export {
    searchReducer,
    searchAction,
}