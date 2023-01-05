import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import {MovieDetails} from "../../components";

const MovieDetailsPage: FC = () => {
    const {movieId, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(movieAction.getMovieById(id))
    },[dispatch, id])

    return (
        <div>
            {status && <h2>Loading...</h2>}
            {
                movieId.map(movie => <MovieDetails key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {MovieDetailsPage}
