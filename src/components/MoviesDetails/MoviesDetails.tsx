import React, {FC, ReactNode} from 'react';

import './MovieDetailsStyle.css';
import {IMovieDetails} from "../../interfaces";
import {urlOriginalImage, urlSize} from "../../constants";
import {StarsRating} from "../StarsRating/StarsRating";
import {MovieVideo} from "../MovieVideo/MovieVideo";

interface IProps {
    movie: IMovieDetails
    children?: ReactNode
}

const MovieDetails: FC<IProps> = ({movie}) => {
    const {
        backdrop_path,
        original_title,
        genres,
        overview,
        poster_path,
        production_countries,
        popularity,
        runtime,
        release_date,
        vote_average,
        vote_count,
        id,
    } = movie;

    return (

        <div className={'movie__details'}>
            <div
                className={'movie__details_banner'}
                style={{backgroundImage: `url(${urlOriginalImage}${backdrop_path})`}}>
            </div>
            <div>
                <MovieVideo id={id}/>
            </div>
        </div>
    )
        ;
};

export {MovieDetails};
