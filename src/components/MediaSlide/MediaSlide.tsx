import React, {FC, ReactNode, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {SwiperGeneral} from "../UI";
import {SwiperSlide} from "swiper/react";
import {MediaItemSlide} from "../MediaItemSlide/MediaItemSlide";

import 'swiper/css/bundle';

interface IProps {
    slidesPerView: number;
    categoryType: string;
    mediaType: string;
    children?: ReactNode;
}

const MediaSlide: FC<IProps> = ({categoryType, mediaType,slidesPerView}) => {

    const {mediaByType} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getMediaByType({categoryType, mediaType, page: '1'}))
    },[dispatch, categoryType, mediaType])

    return (
        <SwiperGeneral slidesPerView={slidesPerView}>
            {
                mediaByType.map(media =>
                    <SwiperSlide key={media.id}>
                        <MediaItemSlide media={media} categoryType={categoryType}/>
                    </SwiperSlide>
                )
            }
        </SwiperGeneral>
    );
};

export {MediaSlide};