import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css'
import {MainLayout} from "./layouts";
import {MediaDetailsPage, MediaPage, MoviesDynamicallyPage, SearchPage, HomePage} from "./pages";

const App: FC = () => {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'discover/:categoryType'} element={<MediaPage/>}/>
                    <Route path={'movie/top_rated'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/upcoming'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/now_playing'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={':type/:id'} element={<MediaDetailsPage/>}/>
                    <Route path={'discover/:categoryType&language=en-US&with_genres=:id'} element={<MediaPage/>}/>
                    <Route path={'search/movie'} element={<SearchPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {App};
