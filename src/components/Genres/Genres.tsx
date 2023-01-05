import React, {FC, useEffect} from 'react';

import './GenresStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {Genre} from "../Genre/Genre";
import {Loader} from "../UI";

const Genres: FC = () => {

    const {genres, status} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAllGenres())
    },[dispatch])

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
