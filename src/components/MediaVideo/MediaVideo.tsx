import React, {FC, useEffect} from 'react';

import './MediaVideo.scss';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Loader} from "../UI";
import {IIndex} from "../../interfaces";

interface IProps {
    categoryType: keyof IIndex,
    id: string,
}

const MediaVideo: FC<IProps> = ({id,categoryType}) => {

    const {mediaVideo, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getVideoById({id, categoryType}))
    }, [dispatch, id, categoryType])

    const mediaVideoFilter = mediaVideo.filter(video => video.name.includes('Official'))

    return (
        <div className={'video'}>
            <h2>Trailers</h2>
            {status && <Loader/>}
            {
                mediaVideoFilter.map(media =>
                    <iframe
                        key={media.id}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${media.key}`}
                        title={media.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                )
            }
        </div>
    );
};

export {MediaVideo};