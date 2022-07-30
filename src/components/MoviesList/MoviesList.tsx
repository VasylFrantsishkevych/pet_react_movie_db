import React, {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import './MovieListStyle.css';
import {MovieListCard} from "../MovieListCard/MovieListCard";
import {movieAction} from "../../redux";

const MoviesList: FC = () => {

    const {movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieAction.getAllMovies())
    }, [dispatch])

    return (
        <div className={'movies'}>
            <div className={'movies__title'}></div>
            <div className={'movies__list'}>
                {
                    movies.map(movie => <MovieListCard key={movie.id} movie={movie}/>)
                }
            </div>
        </div>

    );
};

export {MoviesList}
