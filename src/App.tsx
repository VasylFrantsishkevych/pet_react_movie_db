import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css'
import {MainLayout} from "./layouts";
import {MovieDetailsPage, MoviePage, MoviesDynamicallyPage, SearchPage} from "./pages";
import {useAppLocation} from "./hooks";


const App: FC = () => {

    const {pathname} = useAppLocation();
    const path = pathname.slice(1)

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<MoviePage/>}/>
                    <Route path={'discover/movie'} element={<MoviePage/>}/>
                    <Route path={path} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/:id'} element={<MovieDetailsPage/>}/>
                    <Route path={'discover/movie&language=en-US&with_genres=:id'} element={<MoviePage/>}/>
                    <Route path={'search/movie'} element={<SearchPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {App};
