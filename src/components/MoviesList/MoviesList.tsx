import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";

import './MovieListStyle.css';
import {MoviesListCard} from "../MoviesListCard/MoviesListCard";
import {movieAction} from "../../redux";

const MoviesList: FC = () => {

    const {movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    console.log(movies);

    useEffect(() => {
        dispatch(movieAction.getAllMovies())
    }, [dispatch])

    return (
        <div className={'container'}>
            <div className={'categories'}>
                <div className={'categories__title'}>
                    <h4>categories</h4>
                </div>
                <div className={'categories__genre'}>
                    <h5>genres</h5>
                </div>
            </div>
            <div className={'movies'}>
                {
                    movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export {MoviesList}
