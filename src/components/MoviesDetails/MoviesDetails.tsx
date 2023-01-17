import React, {FC, ReactNode} from 'react';

import './MovieDetailsStyle.css';
import {IMovieDetails} from "../../interfaces";
import {urlOriginalImage, urlSize} from "../../constants";
import {StarsRating} from "../StarsRating/StarsRating";
import {MovieVideo} from "../MovieVideo/MovieVideo";
import {Casts} from "../Casts";

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
                style={{backgroundImage: `url(${urlOriginalImage}${backdrop_path})`}}
            >
                <div className={'movie__details_container'}>
                    <div className={'movie__poster'}>
                        <img src={`${urlSize.w300}${poster_path}`} alt={`${original_title}`}/>
                    </div>
                    <div className={'movie__info'}>
                        <div>
                            <h1>{original_title}</h1>
                            <div className={'movie__info_genre'}>
                                {
                                    genres.map(({id, name}) =>
                                        <span key={id}>{name}</span>
                                    )
                                }
                            </div>
                            <div className={'movie__info_description'}>
                                <p>Data: <span>{release_date}</span></p>
                                <p>Time: <span>{runtime} min.</span></p>
                                <p>Popularity: <span>{popularity}</span></p>
                                <p>{overview}</p>
                            </div>
                        </div>
                        <div className={'container__rating'}>
                            <div className={'container__rating_stars'}>
                                <p>Rate the movie:</p>
                                <StarsRating/>
                            </div>
                            <div className={'votes'}>
                                <p>Vote average: <span>{vote_average.toFixed(1)}</span></p>
                                <p>Vote count: <span>{vote_count}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'movie__details_casts'}>
                <Casts/>
            </div>
            <div className={'movie__details_video'}>
                <MovieVideo id={id}/>
            </div>
        </div>
    )
        ;
};

export {MovieDetails};
