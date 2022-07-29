import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {movieReducer} from "./slices";

let rootReducer = combineReducers({
    movies: movieReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

type rootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    rootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
