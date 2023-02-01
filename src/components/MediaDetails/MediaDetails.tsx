import React, {FC, ReactNode} from 'react';

import './MediaDetailsStyle.css';
import {IIndex, IMediaDetails} from "../../interfaces";
import {category, urlOriginalImage, urlSize} from "../../constants";
import {StarsRating} from "../StarsRating/StarsRating";

interface IProps {
    categoryType: keyof IIndex;
    media: IMediaDetails;
    children?: ReactNode;
}

const MovieDetails: FC<IProps> = ({media, categoryType}) => {
    const {
        backdrop_path,
        original_title,
        original_name,
        genres,
        overview,
        poster_path,
        runtime,
        release_date,
        first_air_date,
        vote_average,
        vote_count,
        production_countries,
        homepage,
        number_of_seasons,
    } = media;

    return (

        <div className={'media__details'}>
            <div
                className={'media__details_banner'}
                style={{backgroundImage: `url(${urlOriginalImage}${backdrop_path})`}}
            >
                <div className={'details__container'}>
                    <div className={'media__poster'}>
                        <img
                            src={`${urlSize.w300}${poster_path}`}
                            alt={`${categoryType === category.movie ? original_title : original_name}`}
                        />
                    </div>
                    <div className={'media__info'}>
                        <div>
                            <h1>{categoryType === category.movie ? original_title : original_name}</h1>
                            <div className={'media__info_genre'}>
                                {
                                    genres.map(({id, name}) =>
                                        <span key={id}>{name}</span>
                                    )
                                }
                            </div>
                            <div className={'media__info_description'}>
                                <p>Data: <span>{categoryType === category.movie ? release_date : first_air_date}</span></p>
                                {number_of_seasons && <p>Seasons: <span>{number_of_seasons}</span></p>}
                                {runtime && <p>Time: <span>{runtime} min.</span></p>}
                                <p>Country: {
                                    production_countries.map(({iso_3166_1}, i) =>
                                        <span key={i}>{iso_3166_1}{i < production_countries.length - 1 && ','}</span>
                                    )
                                }</p>
                                <p>{overview}</p>
                            </div>
                        </div>
                        <div className={'details__container_bottom'}>
                            <div className={'homepage'}>
                                <a href={homepage}>Homepage</a>
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
            </div>
        </div>
    )
        ;
};

export {MovieDetails};
