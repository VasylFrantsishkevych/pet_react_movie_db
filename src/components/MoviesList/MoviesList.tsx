import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import {MoviesListCard} from "../MoviesListCard/MoviesListCard";

const MoviesList: FC = () => {

    const {movies} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    console.log(movies);

    useEffect(() => {
        dispatch(movieAction.getAllMovies())
    },[dispatch])

    return (
        <div>
            {
                movies.map(movie => <MoviesListCard key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {MoviesList}
