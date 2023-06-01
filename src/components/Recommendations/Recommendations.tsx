import React, {FC, useEffect} from 'react';
import {SwiperSlide} from "swiper/react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IIndex} from "../../interfaces";
import {mediaAction} from "../../redux";
import {SwiperGeneral} from "../UI";
import {MediaItemSlide} from "../MediaSlide/MediaItemSlide/MediaItemSlide";

import 'swiper/css/bundle';
import './Recommendations.scss';

interface IProps {
    categoryType: keyof IIndex,
    id: string,
}
const Recommendations: FC<IProps> = ({id, categoryType}) => {

    const {mediaRecommendations} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getRecommendations({id, categoryType}))
    },[dispatch, id, categoryType]);

    const mediaRecommendationsFilter = mediaRecommendations.filter(media => media.poster_path);

    return (
        <div className={'recommendation'}>
            {mediaRecommendationsFilter.length >= 1 && <h2>Recommendations</h2>}
            <SwiperGeneral slidesPerView={5} spaceBetween={10}>
                {
                    mediaRecommendationsFilter.map(media =>
                        <SwiperSlide key={media.id}>
                            <MediaItemSlide media={media} categoryType={categoryType}/>
                        </SwiperSlide>)
                }
            </SwiperGeneral>
        </div>
    );
};

export {Recommendations};