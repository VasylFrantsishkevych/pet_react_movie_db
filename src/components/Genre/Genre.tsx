import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import {IGenres, IIndex} from "../../interfaces";

import './GenreStyle.css';


interface IProps {
    genre: IGenres,
    mediaCategory: keyof IIndex,
    children?: ReactNode,
}

const Genre: FC<IProps> = ({genre, mediaCategory}) => {

    const {id, name} = genre;

    return (
        <div className={'genre'}>
            <Link to={`/discover/${mediaCategory}&language=en-US&with_genres=${id}`} state={genre}>{name}</Link>
        </div>
    );
};

export {Genre};
