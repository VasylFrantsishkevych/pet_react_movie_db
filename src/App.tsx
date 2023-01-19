import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css'
import {MainLayout} from "./layouts";
import {MovieDetailsPage, MediaPage, MoviesDynamicallyPage, SearchPage} from "./pages";
import {useAppLocation} from "./hooks";

const App: FC = () => {

    const {pathname} = useAppLocation();
    const typeMedia = pathname.slice(1)

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<MediaPage/>}/>
                    <Route path={typeMedia} element={<MediaPage/>}/>
                    <Route path={'movie/top_rated'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/upcoming'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/now_playing'} element={<MoviesDynamicallyPage/>}/>
                    <Route path={'movie/:id'} element={<MovieDetailsPage/>}/>
                    <Route path={'discover/movie&language=en-US&with_genres=:id'} element={<MediaPage/>}/>
                    <Route path={'search/movie'} element={<SearchPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {App};
