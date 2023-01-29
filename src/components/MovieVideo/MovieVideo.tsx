import React, {FC, useEffect} from 'react';

import './MovieVideoStyle.css';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Loader} from "../UI";
import {IIndex} from "../../interfaces";

interface IProps {
    id: string;
}

const MovieVideo: FC<IProps> = ({id}) => {

    const {mediaVideo, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const categoryType = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(mediaAction.getVideoById({id, categoryType}))
    }, [dispatch, id, categoryType])

    const mediaVideoFilter = mediaVideo.slice(0, 3)

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

export {MovieVideo};