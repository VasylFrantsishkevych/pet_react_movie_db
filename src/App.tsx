import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import './App.css'
import {MainLayout} from "./layouts";
import {MediaDetailsPage, MediaPage, SearchPage, HomePage} from "./pages";

const App: FC = () => {

    return (
        <div>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'discover/:categoryType'} element={<MediaPage/>}/>
                    <Route path={'discover/:categoryType&language=en-US&with_genres=:id'} element={<MediaPage/>}/>
                    <Route path={'discover/:categoryType&language=en-US&year=:year'} element={<MediaPage/>}/>
                    <Route path={':categoryType/:id'} element={<MediaDetailsPage/>}/>
                    <Route path={'sort/:categoryType/:mediaType'} element={<MediaPage/>}/>
                    <Route path={'search/multi&query=:searchText'} element={<SearchPage/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {App};
