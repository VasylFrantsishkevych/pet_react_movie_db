import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import {IGenres, IIndex} from "../../interfaces";

import './GenreStyle.css';


interface IProps {
    genre: IGenres,
    categoryType: keyof IIndex,
    children?: ReactNode,
}

const Genre: FC<IProps> = ({genre, categoryType}) => {

    const {id, name} = genre;

    return (
        <div className={'genre'}>
            <Link
                to={`/discover/${categoryType}&language=en-US&with_genres=${id}`}
                state={categoryType === 'movie' ? `Movie --- ${name}` : `TV --- ${name}`}>{name}
            </Link>
        </div>
    );
};

export {Genre};
