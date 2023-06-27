import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import {IMediaResults} from "../../interfaces";
import {category, urlSize} from "../../constants";

import './Media.scss';
import {changeColorText} from "../../utils";

interface IProps {
    categoryType?: string;
    media: IMediaResults
    children?: ReactNode
}

const Media: FC<IProps> = ({media, categoryType}) => {

    const {
        id,
        original_title,
        original_name,
        first_air_date,
        poster_path,
        vote_average,
        release_date,
        media_type
    } = media;

    const getCategory = () => {
        let categoryMedia = '';
        if (categoryType) {
            categoryMedia = categoryType
        } else {
            categoryMedia = media_type
        }
        return categoryMedia
    }

    return (
        <div className={'movie-card'}>
            <Link to={`/${getCategory()}/${id}`}>
                <div className={'movie-card-image'}>
                    <img src={`${urlSize.w200}${poster_path}`}
                         alt={`${getCategory() === category.movie ? original_title : original_name}`}
                    />
                </div>
                <div className={'movie-card-title'}>
                    <div>{getCategory() === category.movie ? original_title : original_name}</div>
                </div>
                <div className={`rating ${changeColorText(vote_average)}`}>
                    {vote_average}
                </div>
                <div className={'movie-card-year'}>
                    {getCategory() === category.movie
                        ?
                        release_date?.split('-')[0]
                        :
                        first_air_date?.split('-')[0]}
                </div>
            </Link>
        </div>

    );
};

export {Media}
