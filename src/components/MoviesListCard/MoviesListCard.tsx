import React, {FC, ReactNode} from 'react';
import {IMovieCard} from "../../interfaces";

interface IProps {
    movie: IMovieCard
    children?: ReactNode
}

const MoviesListCard: FC<IProps> = ({movie}) => {

    const {id, original_title, poster_path, release_date, vote_average} = movie;

    return (
        <div className={'movie-info__card'}>
            {/*<div className={'movie-info__card_title'}>*/}
            {/*    <Link to={`/movie/${id}`}><p>{original_title}</p></Link>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Link to={`/movie/${id}`}>*/}
            {/*        <div className={'movie-info__card_image'}>*/}
            {/*            <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`${original_title}`}/>*/}
            {/*        </div>*/}
            {/*    </Link>*/}
            {/*    <div className={'movie-info__card_text'}>*/}
            {/*        <h5>Data: {release_date}</h5>*/}
            {/*        <div className={'rating'}>*/}
            {/*            {vote_average}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={'movie-info__card'}>
                <div className={'movie-info__card_title'}>
                    <p>{original_title}</p>
                </div>
                <div>
                        <div className={'movie-info__card_image'}>
                            <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`${original_title}`}/>
                        </div>
                    <div className={'movie-info__card_text'}>
                        <h5>Data: {release_date}</h5>
                        <div className={'rating'}>
                            {vote_average}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MoviesListCard}
