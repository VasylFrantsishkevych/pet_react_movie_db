import React, {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import './MovieTopRatedPageStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import {Movie, Pagination} from "../../components";

const MovieTopRatedPage: FC = () => {

    const {moviesTopRated} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(movieAction.getTopRatedMovies(page))
    }, [dispatch, query, setQuery])

    return (
        <div className={'movies__rated'}>
            <div className={'movies__rated_list'}>
                {
                    moviesTopRated.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    );
};

export {MovieTopRatedPage};