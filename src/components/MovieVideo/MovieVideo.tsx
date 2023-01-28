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

    const {movieVideo, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(mediaAction.getMovieVideoById({id, type}))
    }, [dispatch, id, type])

    const movieVideoFilter = movieVideo.slice(0, 3)

    return (
        <div className={'video'}>
            <h2>Trailers</h2>
            {status && <Loader/>}
            {
                movieVideoFilter.map(movie =>
                    <iframe
                        key={movie.id}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movie.key}`}
                        title={movie.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                )
            }
        </div>
    );
};

export {MovieVideo};