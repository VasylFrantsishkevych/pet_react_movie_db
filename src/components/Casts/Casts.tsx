import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {useParams} from "react-router-dom";
import {movieAction} from "../../redux";
import {IIndex} from "../../interfaces";

const Casts:FC = () => {

    const {movieCasts} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(movieAction.getCastsMovie({id, type}))
    },[dispatch, id, type])

    console.log(movieCasts)
    return (
        <div>

        </div>
    );
};

export {Casts};