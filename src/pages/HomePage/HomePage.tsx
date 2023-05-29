import React, {FC} from 'react';

import {Button, MediaCarousel, MediaSlide} from "../../components";
import {category, movieType, trendingTimeWindow, tvType} from "../../constants";
import {IIndex} from "../../interfaces";
import {useAppSelector} from "../../hooks";

import './HomePage.scss';
import {useNavigate} from "react-router-dom";


const HomePage: FC = () => {

    const {mediaDataByType: {tvPopular, tvTopRated, moviePopular, movieTopRated}} = useAppSelector(state => state.movies);
    const navigate = useNavigate();

    const movie = category.movie as keyof IIndex;
    const tv = category.tv as keyof IIndex;

    return (
        <div className={'home'}>
            <MediaCarousel
                categoryType={movie}
                timeWindow={trendingTimeWindow.week}
            />
            <div className={'media-slider'}>
                <div>
                    <h2>Movie Popular</h2>
                    <Button onClick={() => navigate(`/sort/${movie}${movieType.popular}`)}>View More</Button>
                </div>
                <MediaSlide
                    categoryType={movie}
                    mediaType={movieType.popular}
                    mediaDataByType={moviePopular}
                />
            </div>
            <div className={'media-slider'}>
                <div>
                    <h2>TV Popular</h2>
                    <Button onClick={() => navigate(`/sort/${movie}${tvType.popular}`)}>View More</Button>
                </div>
                <MediaSlide
                    categoryType={tv}
                    mediaType={tvType.popular}
                    mediaDataByType={tvPopular}
                />
            </div>
            <div className={'media-slider'}>
                <div>
                    <h2>Movie Top Rated</h2>
                    <Button onClick={() => navigate(`/sort/${movie}${movieType.topRated}`)}>View More</Button>
                </div>
                <MediaSlide
                    categoryType={movie}
                    mediaType={movieType.topRated}
                    mediaDataByType={movieTopRated}
                />
            </div>
            <div className={'media-slider'}>
                <div>
                    <h2>TV Top Rated</h2>
                    <Button onClick={() => navigate(`/sort/${movie}${tvType.topRated}`)}>View More</Button>
                </div>
                <MediaSlide
                    categoryType={tv}
                    mediaType={tvType.topRated}
                    mediaDataByType={tvTopRated}
                />
            </div>
        </div>
    );
};

export {HomePage};