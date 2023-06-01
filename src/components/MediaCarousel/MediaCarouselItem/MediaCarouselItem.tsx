import React, {FC} from 'react';
import {IIndex, IMediaResults} from "../../../interfaces";

import './MediaCarouselItem.scss';
import {category, urlSize} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    media: IMediaResults;
    categoryType: keyof IIndex;
}

const MediaCarouselItem: FC<IProps> = ({media, categoryType}) => {

    const {
        backdrop_path,
        original_title,
        original_name,
        release_date,
        vote_average,
        overview,
        id,
        poster_path,
        first_air_date,
    } = media;

    return (
        <div>
            <div className={'carousel'}>
                <img
                    src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                    alt={categoryType === category.movie ? original_title : original_name}
                />
            </div>
            <div className="poster__overlay">
                <Link to={`/${categoryType}/${id}`}>
                    <div className={'poster__image'}>
                        <img
                            src={`${urlSize.w200}${poster_path}`}
                            alt={`${categoryType === category.movie ? original_title : original_name}`}
                        />
                    </div>
                </Link>
                <div className="poster__info">
                    <Link to={`/${categoryType}/${id}`}>
                        <div className={'poster__info_title'}>
                            <span>{categoryType === category.movie ? original_title : original_name}</span>
                        </div>
                    </Link>
                    <p>Release data: {categoryType === category.movie ? release_date : first_air_date}</p>
                    <p>Rating: {vote_average.toFixed(1)}</p>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    );
};

export {MediaCarouselItem};