import React, {FC, useEffect} from 'react';
import './MovieVideoStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieAction} from "../../redux";
import {Loader} from "../UI";

interface IProps {
    id: number;
}
const MovieVideo: FC<IProps> = ({id}) => {

    const {movieVideo, status} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(movieAction.getMovieVideoById(id))
    }, [dispatch, id])

    return (
        <div>
            {status && <Loader/>}
            {
                movieVideo && <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieVideo.key}`}
                    title={movieVideo.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>
            }
        </div>
    );
};

export {MovieVideo};