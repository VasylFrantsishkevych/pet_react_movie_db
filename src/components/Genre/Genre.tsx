import React, {FC, ReactNode} from 'react';
import {Link, useParams} from "react-router-dom";

import {IGenres, IIndex} from "../../interfaces";

import './GenreStyle.css';


interface IProps {
    genre: IGenres
    children?: ReactNode
}

const Genre: FC<IProps> = ({genre}) => {

    const {type} = useParams() as {type: keyof IIndex};

    const {id, name} = genre;

    return (
        <div className={'genre'}>
            <Link to={`/discover/${type}&language=en-US&with_genres=${id}`} state={genre}>{name}</Link>
        </div>
    );
};

export {Genre};
