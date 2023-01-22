import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Loader, MovieDetails} from "../../components";
import {IIndex} from "../../interfaces";

const MovieDetailsPage: FC = () => {
    const {mediaById, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id ,type} = useParams() as {id: string | undefined, type: keyof IIndex};

    useEffect(() => {
        dispatch(mediaAction.getById({id, type}))
    },[dispatch, id, type])

    return (
        <div>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                mediaById.map(movie => <MovieDetails key={movie.id} movie={movie}/>)
            }
        </div>
    );
};

export {MovieDetailsPage}
