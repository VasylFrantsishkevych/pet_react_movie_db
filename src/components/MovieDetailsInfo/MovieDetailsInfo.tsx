import React, {FC, ReactNode} from 'react';

import {IMovieDetails} from "../../interfaces";
import './MovieDetailsInfoStyle.css';
import {StarsRating} from "../StarsRating/StarsRating";
import {urlSize} from "../../constants";

interface IProps {
    movie: IMovieDetails
    children?: ReactNode
}

const MovieDetailsInfo: FC<IProps> = ({movie}) => {

    const {
        original_title,
        genres,
        overview,
        poster_path,
        production_countries,
        popularity,
        runtime,
        release_date,
        vote_average,
        vote_count
    } = movie;
    return (
        <>
            <div className={'movie__details_title'}></div>
            <div className={'movie__details'}>
                <div className={'movie__details_info'}>
                    <div className={'movie__details_card'}>
                        <div className={'img'}>
                            <img src={`${urlSize.w300}${poster_path}`} alt={`${original_title}`}/>
                        </div>
                        <div className={'container__info'}>
                            <div className={'info'}>
                                <h2>{original_title}</h2>
                                <p>Genre: {
                                    genres.map(({id, name}, i) =>
                                        <span key={id}>{name}{i < genres.length - 1 && ', '}</span>
                                    )
                                }
                                </p>
                                <p>Country: {
                                    production_countries.map((country, i) =>
                                        <span key={i}>{country.iso_3166_1}</span>
                                    )
                                }
                                </p>
                                <p>Time: <span>{runtime}</span></p>
                                <p>Data: <span>{release_date}</span></p>
                                <p>Popularity: <span>{popularity}</span></p>
                            </div>
                            <div>
                                <div className={'movie__details_card_rating'}>
                                    <span>Rate the movie:</span>
                                    <StarsRating/>
                                </div>
                                <div className={'votes'}>
                                    <p>Vote average: <span>{vote_average}</span></p>
                                    <p>Vote count: <span>{vote_count}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={'description'}>{overview}</p>
                </div>
            </div>
        </>
    );
};

export {MovieDetailsInfo}
