import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import './MovieListCardStyle.css';
import {IMovieCard} from "../../interfaces";
import {urlSize} from "../../constants";

interface IProps {
    movie: IMovieCard
    children?: ReactNode
}

const MovieListCard: FC<IProps> = ({movie}) => {

    const {id, original_title, poster_path, vote_average} = movie;

    return (
        <div className={'movie__card'}>
            <Link to={`/movie/${id}`}>
                <div className={'movie__card_image'}>
                    <img src={`${urlSize.w200}${poster_path}`} alt={`${original_title}`}/>
                </div>
                <div className={'movie__card_title'}>
                    <div>{original_title}</div>
                </div>
                <div className={'rating'}>
                    {vote_average}
                </div>
            </Link>
        </div>

    );
};

export {MovieListCard}
