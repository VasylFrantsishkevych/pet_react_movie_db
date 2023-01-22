import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {Genre} from "../Genre/Genre";
import {Loader} from "../UI";
import {IIndex} from "../../interfaces";

import './GenresStyle.css';

const Genres: FC = () => {

    const {genres, status} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();
    const {type} = useParams() as {type: keyof IIndex};

    useEffect(() => {
        dispatch(genreActions.getAll({type}))
    },[dispatch, type])

    return (
        <div className={'genres__list'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                genres.map(genre => <Genre key={genre.id} genre={genre}/>)
            }
        </div>
    );
};

export {Genres}
