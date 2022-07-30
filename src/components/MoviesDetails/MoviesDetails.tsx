import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import './MoviesDetailsStyle.css';
import {MovieDetailsInfo} from "../MovieDetailsInfo/MovieDetailsInfo";

const MoviesDetails: FC = () => {
    const {movieId} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id} = useParams();

    useEffect(() => {
         dispatch(movieAction.getMovieById(id))
     },[dispatch, id])

    return (
        <div>
            {
                movieId.map(movie => <MovieDetailsInfo key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {MoviesDetails}
