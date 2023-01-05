import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import './GenreStyle.css';
import {IGenres} from "../../interfaces";

interface IProps {
    genre: IGenres
    children?: ReactNode
}

const Genre: FC<IProps> = ({genre}) => {

    const {id, name} = genre;
    console.log(id);
    return (
        <div className={'genre'}>
            <Link to={`/discover/movie&language=en-US&with_genres=${id}`} state={genre}>{name}</Link>
        </div>
    );
};

export {Genre};
