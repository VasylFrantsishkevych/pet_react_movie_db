import React, {FC, ReactNode} from 'react';

import {IMediaResults} from "../../../interfaces";
import {urlSize} from "../../../constants";
import {Link} from "react-router-dom";

interface IProps {
    movie: IMediaResults,
    children?: ReactNode,
}
const Recommendation: FC<IProps> = ({movie}) => {
    const {poster_path, original_title, id} = movie;
    return (
        <div>
            <Link to={`/movie/${id}`}>
                <img src={`${urlSize.w200}${poster_path}`} alt={original_title}/>
            </Link>
        </div>
    );
};

export {Recommendation};