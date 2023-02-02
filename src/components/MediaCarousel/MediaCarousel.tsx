import React, {FC, useEffect} from 'react';
import {IIndex} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {SwiperGeneral} from "../UI";
import {SwiperSlide} from "swiper/react";
import {MediaCarouselItem} from "./MediaCarouselItem/MediaCarouselItem";

import 'swiper/css/bundle';

interface IProps {
    categoryType: keyof IIndex;
    timeWindow: string;
}

const MediaCarousel: FC<IProps> = ({categoryType, timeWindow}) => {

    const {mediaTrending} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getTrending({categoryType, timeWindow}))
    }, [dispatch, categoryType, timeWindow])

    return (
        <SwiperGeneral
            slidesPerView={1}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        >
            {
                mediaTrending.map(media =>
                    <SwiperSlide key={media.id}>
                        <MediaCarouselItem media={media} categoryType={categoryType}/>
                    </SwiperSlide>
                )
            }
        </SwiperGeneral>
    );
};

export {MediaCarousel};