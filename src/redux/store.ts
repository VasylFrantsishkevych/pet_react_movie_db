import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {genreReducer, mediaReducer, searchReducer} from "./slices";

let rootReducer = combineReducers({
    movies: mediaReducer,
    genres: genreReducer,
    search: searchReducer,
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}
