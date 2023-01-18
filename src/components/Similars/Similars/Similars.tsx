import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppLocation, useAppSelector} from "../../../hooks";
import {IIndex} from "../../../interfaces";
import {movieAction} from "../../../redux";

interface IProps {
    id: number
}
const Similars: FC<IProps> = ({id}) => {

    const {movieSimilar} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const {pathname} = useAppLocation();

    const type = pathname.split('/').splice(1)[0] as keyof IIndex;

    useEffect(() => {
        dispatch(movieAction.getSimilar({id, type}))
    },[dispatch, id, type]);

    return (
        <div>

        </div>
    );
};

export {Similars};