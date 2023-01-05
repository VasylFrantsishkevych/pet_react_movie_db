import {IMovieResults} from "../../interfaces";
import {createSlice} from "@reduxjs/toolkit";

interface IState {
    searchMovie: IMovieResults[],
    searchText: string
}

const initialState: IState ={
    searchMovie: [],
    searchText: '',
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        addSearchText: (state, {payload}) => {
            state.searchText = payload
        }
    },
    extraReducers: {}
})

const {reducer: searchReducer, actions: {addSearchText}} = searchSlice;

const searchAction = {
    addSearchText,
}

export {
    searchReducer,
    searchAction,
}