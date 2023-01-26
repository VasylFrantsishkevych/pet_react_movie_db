import React, {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {Genre} from "../Genre/Genre";
import {Loader} from "../UI";
import {IGenres, IIndex} from "../../interfaces";

import './GenresStyle.css';

interface IProps {
    genres: IGenres[],
    mediaCategory: keyof IIndex,
}

const Genres: FC<IProps> = ({mediaCategory, genres}) => {

    const {status} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAll({mediaCategory}))
    },[dispatch, mediaCategory])

    return (
        <div className={'genres__list'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                genres.map(genre => <Genre key={genre.id} genre={genre} mediaCategory={mediaCategory}/>)
            }
        </div>
    );
};

export {Genres}
