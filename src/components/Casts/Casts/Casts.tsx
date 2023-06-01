import React, {FC, useEffect} from 'react';
import {SwiperSlide} from "swiper/react";
import 'swiper/css/bundle'

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {mediaAction} from "../../../redux";
import {IIndex} from "../../../interfaces";
import './Casts.scss';
import {Cast} from "../Cast/Cast";
import {SwiperGeneral} from "../../UI";

interface IProps {
    categoryType: keyof IIndex;
    id: string
}
const Casts:FC<IProps> = ({id, categoryType}) => {

    const {mediaCasts} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(mediaAction.getCastsById({id, categoryType}))
    },[dispatch, id, categoryType]);

    const castsSort = mediaCasts
        .filter((cast) => cast.known_for_department === 'Acting' && cast.profile_path)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0,10);


    return (
        <div className={'casts'}>
            <h2>Casts</h2>
            <SwiperGeneral slidesPerView={5}>
                {
                    castsSort.map(cast =>
                        <SwiperSlide key={cast.id}>
                            <Cast cast={cast}/>
                        </SwiperSlide>)
                }
            </SwiperGeneral>
        </div>
    );
};

export {Casts};