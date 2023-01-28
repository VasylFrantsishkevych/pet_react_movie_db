import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Casts, Loader, MovieDetails, MovieVideo, Recommendations} from "../../components";
import {IIndex} from "../../interfaces";

import './MediaDetailsPageStyle.css';

const MediaDetailsPage: FC = () => {
    const {mediaById, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id ,type} = useParams() as {id: string, type: keyof IIndex};

    useEffect(() => {
        dispatch(mediaAction.getById({id, type}))
    },[dispatch, id, type])

    return (
        <div className={'media__details_container'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                mediaById.map(movie => <MovieDetails key={movie.id} movie={movie}/>)
            }
            <div className={'media__details_casts'}>
                <Casts id={id}/>
            </div>
            <div className={'media__details_video'}>
                <MovieVideo id={id}/>
            </div>
            <div className={'media__details_similar'}>
                <Recommendations id={id}/>
            </div>
        </div>
    );
};

export {MediaDetailsPage}
