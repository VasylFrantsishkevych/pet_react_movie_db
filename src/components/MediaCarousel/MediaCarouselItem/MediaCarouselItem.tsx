import React, {FC} from 'react';
import {IIndex, IMediaResults} from "../../../interfaces";

import './MediaCarouselItemStyle.css';
import {category, urlSize} from "../../../constants";

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
                <div className={'poster__image'}>
                    <img
                        src={`${urlSize.w200}${poster_path}`}
                        alt={`${categoryType === category.movie ? original_title : original_name}`}
                    />
                </div>
                <div className="poster__info">
                    <div className={'poster__info_title'}>
                        <span>{categoryType === category.movie ? original_title : original_name}</span>
                    </div>
                    <div>Release data: {release_date}</div>

                </div>
            </div>
        </div>
    );
};

export {MediaCarouselItem};