import React, {FC, useEffect} from 'react';
import {Navigation} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../../hooks";
import {IIndex} from "../../../interfaces";
import {mediaAction} from "../../../redux";
import {Recommendation} from "../Recommendation/Recommendation";

import 'swiper/css/bundle';
import './Recommendations.style.css';
interface IProps {
    id: string,
}
const Recommendations: FC<IProps> = ({id}) => {

    const {movieRecommendations} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(mediaAction.getRecommendations({id, type}))
    },[dispatch, id, type]);

    const movieRecommendationsFilter = movieRecommendations.filter(movie => movie.poster_path);

    return (
        <div className={'similar'}>
            {movieRecommendationsFilter.length >= 1 && <h2>Recommendations</h2>}
            <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={4.5}
                spaceBetween={10}
                simulateTouch={false}
            >
                {
                    movieRecommendationsFilter.map(movie =>
                        <SwiperSlide key={movie.id}>
                            <Recommendation movie={movie}/>
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export {Recommendations};