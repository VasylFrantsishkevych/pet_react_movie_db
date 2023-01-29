import React, {FC, ReactNode} from 'react';
import {Link} from "react-router-dom";

import {category, urlSize} from "../../constants";
import {IMediaResults} from "../../interfaces";

import './MediaItemSlideStyle.css';

interface IProps {
    categoryType?: string;
    media: IMediaResults
    children?: ReactNode
}

const MediaItemSlide: FC<IProps> = ({media, categoryType}) => {

    const {id, original_title, original_name,  poster_path, vote_average} = media;
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
        <div className={'media__item'}>
            <Link to={`/${categoryType}/${id}`}>
                <div>
                    <img src={`${urlSize.w200}${poster_path}`}
                         alt={`${categoryType === category.movie ? original_title : original_name}`}/>
                </div>
                <div className={`media__item_rating ${changeColorText(vote_average)}`}>
                    {vote_average.toFixed(1)}
                </div>
            </Link>
        </div>
    );
};

export {MediaItemSlide};