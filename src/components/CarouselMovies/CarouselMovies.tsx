import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import './CarouselMoviesStyle.css';
import {IIndex} from "../../interfaces";

interface IProps {
    typeMedia: keyof IIndex;
    timeWindow: string;
}
const CarouselMovies: FC<IProps> = ({typeMedia, timeWindow}) => {

    const {mediaTrending} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getTrending({typeMedia, timeWindow}))
    }, [dispatch, typeMedia, timeWindow])

    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
            >
                {
                    mediaTrending.map(movie =>
                        <Link  to={`/movie/${movie.id}`} key={movie.id}>
                            <div className={'carousel'}>
                                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title}/>
                            </div>
                            <div className="posterImage__overlay">
                                <div className="posterImage__title">{movie.original_title}</div>
                                <div className="posterImage__runtime">
                                    {movie.release_date}
                                    <span className="posterImage__rating">
                                            {movie.vote_average}
                                        <i className="fas fa-star"/>{" "}
                                        </span>
                                </div>
                            </div>
                        </Link>)
                }
            </Carousel>
        </div>
    );
};

export {CarouselMovies};