import React, {FC} from 'react';

import {CarouselMovies, MediaSlide} from "../../components";
import {category, movieType, trendingTimeWindow, tvType} from "../../constants";
import {IIndex} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import './Home.style.css';
import {useNavigate} from "react-router-dom";


const HomePage: FC = () => {

    const {mediaDataByType: {tvPopular, tvTopRated, moviePopular, movieTopRated}} = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    const movie = category.movie as keyof IIndex;
    const tv = category.tv as keyof IIndex;

    return (
        <div className={'home'}>
            <CarouselMovies categoryType={movie} timeWindow={trendingTimeWindow.week}/>
            <div className={'media__slider'}>
                <div>
                    <h2>Movie Popular</h2>
                    <button onClick={() => navigate(`/sort/${movie}${movieType.topRated}`)}>More</button>
                </div>
                <MediaSlide
                    categoryType={movie}
                    mediaType={movieType.popular}
                    slidesPerView={5}
                    mediaDataByType={moviePopular}
                />
            </div>
            <div className={'media__slider'}>
                <div>
                    <h2>TV Popular</h2>
                </div>
                <MediaSlide
                    categoryType={tv}
                    mediaType={tvType.popular}
                    slidesPerView={5}
                    mediaDataByType={tvPopular}
                />
            </div>
            <div className={'media__slider'}>
                <div>
                    <h2>Movie Top Rated</h2>
                </div>
                <MediaSlide
                    categoryType={movie}
                    mediaType={movieType.topRated}
                    slidesPerView={5}
                    mediaDataByType={movieTopRated}
                />
            </div>
            <div className={'media__slider'}>
                <div>
                    <h2>TV Top Rated</h2>
                </div>
                <MediaSlide
                    categoryType={tv}
                    mediaType={tvType.topRated}
                    slidesPerView={5}
                    mediaDataByType={tvTopRated}
                />
            </div>
        </div>
    );
};

export {HomePage};