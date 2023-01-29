import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {Media, Pagination} from "../../components";
import './MovieDynamicallyPage.css';
import {IIndex} from "../../interfaces";

const MoviesDynamicallyPage: FC = () => {

    const {mediaSortedByType} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {categoryType, mediaType} = useParams() as {categoryType: keyof IIndex, mediaType: string};

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(mediaAction.getMediaSortByType({categoryType, mediaType, page}))
    }, [dispatch, query, setQuery, categoryType, mediaType])
    console.log(mediaSortedByType);
    return (
        <div className={'movies__rated'}>
            <div className={'movies__rated_list'}>
                {
                    mediaSortedByType.map(media => <Media key={media.id} media={media} categoryType={categoryType}/>)
                }
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    );
};

export {MoviesDynamicallyPage};