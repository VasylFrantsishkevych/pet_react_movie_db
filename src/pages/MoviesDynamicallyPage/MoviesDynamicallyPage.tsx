import React, {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import {Movie, Pagination} from "../../components";
import './MovieDynamicallyPage.css';

const MoviesDynamicallyPage: FC = () => {

    const {moviesDynamically} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {pathname} = useAppLocation();

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(movieAction.getMoviesDynamically({page, pathname}))
    }, [dispatch, query, setQuery, pathname])

    return (
        <div className={'movies__rated'}>
            <div className={'movies__rated_list'}>
                {
                    moviesDynamically.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    );
};

export {MoviesDynamicallyPage};