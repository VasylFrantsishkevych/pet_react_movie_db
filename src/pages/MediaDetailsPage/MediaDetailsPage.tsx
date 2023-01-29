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
    const {id ,categoryType} = useParams() as {id: string, categoryType: keyof IIndex};

    useEffect(() => {
        dispatch(mediaAction.getById({id, categoryType}))
    },[dispatch, id, categoryType])

    return (
        <div className={'media__details_container'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                mediaById.map(media => <MovieDetails key={media.id} media={media}/>)
            }
            <div className={'media__details_casts'}>
                <Casts id={id} categoryType={categoryType}/>
            </div>
            <div className={'media__details_video'}>
                <MovieVideo id={id} categoryType={categoryType}/>
            </div>
            <div className={'media__details_similar'}>
                <Recommendations id={id} categoryType={categoryType}/>
            </div>
        </div>
    );
};

export {MediaDetailsPage}
