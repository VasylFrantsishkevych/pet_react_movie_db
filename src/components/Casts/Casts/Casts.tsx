import React, {FC, useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/bundle'
import {Navigation} from "swiper";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../../hooks";
import {mediaAction} from "../../../redux";
import {IIndex} from "../../../interfaces";
import './CastsStyle.css';
import {Cast} from "../Cast/Cast";

interface IProps {
    id: number
}
const Casts:FC<IProps> = ({id}) => {

    const {movieCasts} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(mediaAction.getCastsMovie({id, type}))
    },[dispatch, id, type]);

    const castsTop = movieCasts
        .filter((cast) => cast.known_for_department === 'Acting' && cast.profile_path)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0,10);


    return (
        <div className={'casts'}>
            <h2>Casts</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                slidesPerView={5.5}
                spaceBetween={20}
                simulateTouch={false}
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