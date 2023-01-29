import React, {FC, ReactNode, useEffect} from 'react';

import {useAppDispatch} from "../../hooks";
import {mediaAction} from "../../redux";
import {SwiperGeneral} from "../UI";
import {SwiperSlide} from "swiper/react";
import {MediaItemSlide} from "../MediaItemSlide/MediaItemSlide";

import 'swiper/css/bundle';
import {IIndex, IMediaResults} from "../../interfaces";

interface IProps {
    slidesPerView: number;
    categoryType: keyof IIndex;
    mediaType: string;
    mediaDataByType: IMediaResults[];
    children?: ReactNode;
}

const MediaSlide: FC<IProps> = ({categoryType, mediaType,slidesPerView, mediaDataByType}) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getMediaByType({categoryType, mediaType, page: '1'}))
    },[dispatch, categoryType, mediaType])

    return (
        <SwiperGeneral slidesPerView={slidesPerView}>
            {
                mediaDataByType.map(media =>
                    <SwiperSlide key={media.id}>
                        <MediaItemSlide media={media} categoryType={categoryType}/>
                    </SwiperSlide>
                )
            }
        </SwiperGeneral>
    );
};

export {MediaSlide};