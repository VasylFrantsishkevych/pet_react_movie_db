import React, {FC, useEffect} from 'react';
import {SwiperSlide} from "swiper/react";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {IIndex} from "../../interfaces";
import {mediaAction} from "../../redux";

import 'swiper/css/bundle';
import './Recommendations.style.css';
import {SwiperGeneral} from "../UI";
import {MediaItemSlide} from "../MediaItemSlide/MediaItemSlide";
interface IProps {
    id: string,
}
const Recommendations: FC<IProps> = ({id}) => {

    const {mediaRecommendations} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const categoryType = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(mediaAction.getRecommendations({id, categoryType}))
    },[dispatch, id, categoryType]);

    const mediaRecommendationsFilter = mediaRecommendations.filter(media => media.poster_path);

    return (
        <div className={'similar'}>
            {mediaRecommendationsFilter.length >= 1 && <h2>Recommendations</h2>}
            <SwiperGeneral slidesPerView={5}>
                {
                    mediaRecommendationsFilter.map(media =>
                        <SwiperSlide key={media.id}>
                            <MediaItemSlide media={media}/>
                        </SwiperSlide>)
                }
            </SwiperGeneral>
        </div>
    );
};

export {Recommendations};