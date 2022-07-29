import {createSlice} from "@reduxjs/toolkit";
import {IMovieCard, IMovieDetails} from "../../interfaces";

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

const movieSlice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {},
    extraReducers: {}
})

const {reducer: movieReducer} = movieSlice;

const movieAction = {

}

export {
    movieReducer,
    movieAction
}


