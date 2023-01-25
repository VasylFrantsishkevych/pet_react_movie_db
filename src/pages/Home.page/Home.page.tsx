import React, {FC} from 'react';

import {CarouselMovies, MediaSlide} from "../../components";
import {category, movieType, trendingTimeWindow, tvType} from "../../constants";
import {IIndex} from "../../interfaces";

import './Home.style.css';


const HomePage: FC = () => {

    const typeMedia = category.movie as keyof IIndex;
    return (
        <div className={'home'}>
            <CarouselMovies typeMedia={typeMedia} timeWindow={trendingTimeWindow.week}/>
            <div className={'media__slider'}>
                <h2>Movie Popular</h2>
                <MediaSlide categoryType={category.movie} mediaType={movieType.popular} slidesPerView={5}/>
            </div>
            <div className={'media__slider'}>
                <h2>TV Popular</h2>
                <MediaSlide categoryType={category.tv} mediaType={tvType.popular} slidesPerView={5}/>
            </div>
        </div>
    );
};

export {HomePage};