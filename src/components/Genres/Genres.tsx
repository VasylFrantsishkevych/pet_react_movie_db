import React, {FC, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {Genre} from "../Genre/Genre";
import {Loader} from "../UI";
import {IGenres, IIndex} from "../../interfaces";

import './Genres.scss';

interface IProps {
    genres: IGenres[],
    categoryType: keyof IIndex,
}

const Genres: FC<IProps> = ({categoryType, genres}) => {

    const {status} = useAppSelector(state => state.genres);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(genreActions.getAll({categoryType}))
    },[dispatch, categoryType])

    return (
        <div className={'genres-list'}>
            {status && <div className={'main_loader'}><Loader/></div>}
            {
                genres.map(genre => <Genre key={genre.id} genre={genre} categoryType={categoryType}/>)
            }
        </div>
    );
};

export {Genres}
