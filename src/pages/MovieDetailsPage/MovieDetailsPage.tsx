import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Loader, MovieDetails} from "../../components";

const MovieDetailsPage: FC = () => {
    const {movieId, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(mediaAction.getMovieById(id))
    },[dispatch, id])

    return (
        <div>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                movieId.map(movie => <MovieDetails key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {MovieDetailsPage}
