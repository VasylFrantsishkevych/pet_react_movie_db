import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/bundle'

import {useAppDispatch, useAppLocation, useAppSelector} from "../../../hooks";
import {movieAction} from "../../../redux";
import {IIndex} from "../../../interfaces";
import './CastsStyle.css';
import {Cast} from "../Cast/Cast";

const Casts:FC = () => {

    const {movieCasts} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(movieAction.getCastsMovie({id, type}))
    },[dispatch, id, type]);

    const castsTop = movieCasts
        .filter((cast) => cast.known_for_department === 'Acting')
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0,10);

    return (
        <div className={'casts'}>
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                grabCursor={true}
            >
                {
                    castsTop.map(cast =>
                        <SwiperSlide key={cast.id}>
                            <Cast cast={cast}/>
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export {Casts};