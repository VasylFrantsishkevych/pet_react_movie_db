import React, {FC, ReactNode} from 'react';
import {Navigation} from "swiper";
import {Swiper} from "swiper/react";

import 'swiper/css/bundle';
interface IProps {
    slidesPerView: number;
    children?: ReactNode;
}
const SwiperGeneral: FC<IProps> = ({children, slidesPerView}) => {

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={slidesPerView}
            spaceBetween={10}
            simulateTouch={false}
        >
            {children}
        </Swiper>
    )
};

export {SwiperGeneral};