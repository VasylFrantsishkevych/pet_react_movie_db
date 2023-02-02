import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {IMediaResponse, IMediaResults} from "../../interfaces";
import {searchService} from "../../services";

interface IState {
    searchData: IMediaResults[],
    searchText: string,
    status: boolean | null,
    currentPage: number,
    totalPages: number,
}

const initialState: IState ={
    searchData: [],
    searchText: '',
    status: null,
    currentPage: 1,
    totalPages: 0,
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
                const {page, results, total_pages} = payload;
                state.searchData = results
                state.currentPage = page
                state.totalPages = total_pages
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