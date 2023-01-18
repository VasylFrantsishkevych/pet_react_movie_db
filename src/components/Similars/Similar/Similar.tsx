import React, {FC, ReactNode} from 'react';

import {IMovieResults} from "../../../interfaces";
import {urlSize} from "../../../constants";

interface IProps {
    movie: IMovieResults,
    children?: ReactNode,
}
const Similar: FC<IProps> = ({movie}) => {
    const {poster_path, original_title} = movie;
    return (
        <div>
            <img src={`${urlSize.w200}${poster_path}`} alt={original_title}/>
        </div>
    );
};

export {Similar};