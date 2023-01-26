import React, {FC} from 'react';

import {CarouselMovies, MediaSlide} from "../../components";
import {category, movieType, trendingTimeWindow, tvType} from "../../constants";
import {IIndex} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import './Home.style.css';


const HomePage: FC = () => {

    const {mediaDataByType: {tvPopular, tvTopRated, moviePopular, movieTopRated}} = useAppSelector(state => state.movies);

    const typeMedia = category.movie as keyof IIndex;
    return (
        <div className={'home'}>
            <CarouselMovies typeMedia={typeMedia} timeWindow={trendingTimeWindow.week}/>
            <div className={'media__slider'}>
                <div>
                    <h2>Movie Popular</h2>
                    <button>More</button>
                </div>
                <MediaSlide
                    categoryType={category.movie}
                    mediaType={movieType.popular}
                    slidesPerView={5}
                    mediaDataByType={moviePopular}
                />
            </div>
            <div className={'media__slider'}>
                <h2>TV Popular</h2>
                <MediaSlide
                    categoryType={category.tv}
                    mediaType={tvType.popular}
                    slidesPerView={5}
                    mediaDataByType={tvPopular}
                />
            </div>
            <div className={'media__slider'}>
                <h2>Movie Top Rated</h2>
                <MediaSlide
                    categoryType={category.movie}
                    mediaType={movieType.topRated}
                    slidesPerView={5}
                    mediaDataByType={movieTopRated}
                />
            </div>
            <div className={'media__slider'}>
                <h2>TV Top Rated</h2>
                <MediaSlide
                    categoryType={category.tv}
                    mediaType={tvType.topRated}
                    slidesPerView={5}
                    mediaDataByType={tvTopRated}
                />
            </div>
        </div>
    );
};

export {HomePage};