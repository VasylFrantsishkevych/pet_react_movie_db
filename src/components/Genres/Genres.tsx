import React, {FC, useEffect} from 'react';

import './GenresStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {Genre} from "../Genre/Genre";

const Genres: FC = () => {

    const {genres} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAllGenres())
    },[dispatch])

    return (
        <div className={'genres__list'}>
            {
                genres.map(genre => <Genre key={genre.id} genre={genre}/>)
            }
        </div>
    );
};

export {Genres}