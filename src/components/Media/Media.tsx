import React, {FC, ReactNode} from 'react';
import {Link, useParams} from "react-router-dom";

import {IIndex, IMediaResults} from "../../interfaces";
import {urlSize} from "../../constants";

import './Media.style.css';

interface IProps {
    media: IMediaResults
    children?: ReactNode
}

const Media: FC<IProps> = ({media}) => {

    const {id, original_title, poster_path, vote_average, release_date} = media;

    const {type} = useParams() as {type: keyof IIndex};

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
            <Link to={`/${type}/${id}`}>
                <div className={'movie__card_image'}>
                    <img src={`${urlSize.w200}${poster_path}`} alt={`${original_title}`}/>
                </div>
                <div className={'movie__card_title'}>
                    <div>{original_title}</div>
                    <div>{release_date}</div>
                </div>
                <div className={`rating ${changeColorText(vote_average)}`}>
                    {vote_average}
                </div>
            </Link>
        </div>

    );
};

export {Media}
