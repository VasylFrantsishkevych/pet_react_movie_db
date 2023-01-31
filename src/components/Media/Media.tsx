import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import {IMediaResults} from "../../interfaces";
import {category, urlSize} from "../../constants";

import './Media.style.css';

interface IProps {
    categoryType?: string;
    media: IMediaResults
    children?: ReactNode
}

const Media: FC<IProps> = ({media, categoryType}) => {

    const {id, original_title, original_name, first_air_date, poster_path, vote_average, release_date} = media;

    const changeColorText = (vote: number) => {
        if (vote >= 8) {
            return 'rating__color_green'
        }else if (vote >= 6) {
            return 'rating__color_yellow'
        }else {
            return 'rating__color_red'
        }
    }

    return (
        <div className={'movie__card'}>
            <Link to={`/${categoryType}/${id}`}>
                <div className={'movie__card_image'}>
                    <img src={`${urlSize.w200}${poster_path}`}
                         alt={`${categoryType === category.movie ? original_title : original_name}`}
                    />
                </div>
                <div className={'movie__card_title'}>
                    <div>{categoryType === category.movie ? original_title : original_name}</div>
                    <div>{categoryType === category.movie ? release_date : first_air_date}</div>
                </div>
                <div className={`rating ${changeColorText(vote_average)}`}>
                    {vote_average}
                </div>
            </Link>
        </div>

    );
};

export {Media}
