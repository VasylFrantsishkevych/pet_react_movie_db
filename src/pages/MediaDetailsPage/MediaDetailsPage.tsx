import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Casts, Loader, MovieDetails, MediaVideo, Recommendations} from "../../components";
import {IIndex} from "../../interfaces";

import './MediaDetailsPage.scss';

const MediaDetailsPage: FC = () => {
    const {mediaById, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id ,categoryType} = useParams() as {id: string, categoryType: keyof IIndex};

    useEffect(() => {
        dispatch(mediaAction.getById({id, categoryType}))
    },[dispatch, id, categoryType])

    return (
        <div className={'media-details-container'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                mediaById.map(media => <MovieDetails key={media.id} media={media} categoryType={categoryType}/>)
            }
            <div className={'media-details-casts'}>
                <Casts id={id} categoryType={categoryType}/>
            </div>
            <div className={'media-details-video'}>
                <MediaVideo id={id} categoryType={categoryType}/>
            </div>
            <div className={'media-details-similar'}>
                <Recommendations id={id} categoryType={categoryType}/>
            </div>
        </div>
    );
};

export {MediaDetailsPage}
