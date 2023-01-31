import React, {FC, ReactNode} from 'react';
import {Navigation, Pagination, Autoplay} from "swiper";
import {Swiper} from "swiper/react";

import 'swiper/css/bundle';
interface IProps {
    autoplay?: {
        delay?: number;
        disableOnInteraction?: boolean;
    };
    pagination?: {
        clickable?: boolean;
    };
    spaceBetween?: number;
    slidesPerView: number;
    children?: ReactNode;
}
const SwiperGeneral: FC<IProps> = ({children, ...props}) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            simulateTouch={false}
            {...props}
        >
            {children}
        </Swiper>
    )
};

export {SwiperGeneral};