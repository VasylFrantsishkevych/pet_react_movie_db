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
            <div className="poster-overlay">
                <Link to={`/${categoryType}/${id}`}>
                    <div className={'poster-image'}>
                        <img
                            src={`${urlSize.w200}${poster_path}`}
                            alt={`${categoryType === category.movie ? original_title : original_name}`}
                        />
                    </div>
                </Link>
                <div className="poster-info">
                    <Link to={`/${categoryType}/${id}`}>
                        <div className={'poster-info-title'}>
                            <span>{categoryType === category.movie ? original_title : original_name}</span>
                        </div>
                    </Link>
                    <p>Release data: <span>{categoryType === category.movie ? release_date : first_air_date}</span></p>
                    <p>Rating: <span>{vote_average.toFixed(1)}</span></p>
                    <p>{overview}</p>
                </div>
            </div>
        </div>
    );
};

export {MediaCarouselItem};