import React, {FC, ReactNode} from 'react';

import './MovieDetailsStyle.css';
import {IMovieDetails} from "../../interfaces";
import {urlSize} from "../../constants";
import {StarsRating} from "../StarsRating/StarsRating";
import {MovieVideo} from "../MovieVideo/MovieVideo";

interface IProps {
    movie: IMovieDetails
    children?: ReactNode
}

const MovieDetails: FC<IProps> = ({movie}) => {
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
        vote_count,
        id,
    } = movie;

    return (
        <>
            <div className={'movie__details'}>
                <div className={'movie__details_info'}>
                    <div className={'movie__details_card'}>
                        <div className={'img'}>
                            <img src={`${urlSize.w300}${poster_path}`} alt={`${original_title}`}/>
                        </div>
                        <div className={'container__info'}>
                            <div className={'info'}>
                                <h2>{original_title}</h2>
                                <ul className={'info__full'}>
                                    <li>
                                        <span>Data:</span>
                                        <span>{release_date}</span>
                                    </li>
                                    <li>
                                        <span>Genre:</span>
                                        {
                                            genres.map(({id, name}, i) =>
                                                <span key={id}>
                                                    {name}
                                                    {i < genres.length - 1 && ', '}
                                                </span>
                                            )
                                        }
                                    </li>
                                    <li>
                                        <span>Country:</span>
                                        {
                                            production_countries.map((country, i) =>
                                                <span key={i}>
                                                    {country.iso_3166_1}
                                                    {i < country.iso_3166_1.length - 1 && ', '}
                                                </span>
                                            )
                                        }
                                    </li>
                                    <li>
                                        <span>Time:</span>
                                        <span>{runtime} min.</span>
                                    </li>
                                    <li>
                                        <span>Popularity:</span>
                                        <span>{popularity}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={'container__rating'}>
                                <div className={'container__rating_stars'}>
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
                    <div className={'description'}>
                        <h3>Description {original_title}</h3>
                        <p>{overview}</p>
                    </div>
                    <div>
                        <MovieVideo id={id}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export {MovieDetails};
