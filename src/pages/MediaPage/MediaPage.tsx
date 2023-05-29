import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {IGenres, IIndex} from "../../interfaces";
import {Loader, Media, MediaCarousel, Pagination} from "../../components";
import {trendingTimeWindow} from "../../constants";

import './MediaPage.scss';

interface IParams {
    id: string | undefined,
    categoryType: keyof IIndex,
    mediaType: string,
    year: string,
}
const MediaPage: FC = () => {

    const {medias, status, currentPage, totalPages, mediaPageTitle} = useAppSelector(state => state.movies);
    const {state} = useAppLocation<IGenres>();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {id, categoryType, mediaType, year} = useParams<keyof IParams>() as IParams;

    useEffect(() => {
        if (state) {
            dispatch(mediaAction.addMediaPageTitle(state));
        }else if  (!query.get('page')){
            setQuery({page: '1'})
        }
        const page = query.get('page');
        if (mediaType) {
            dispatch(mediaAction.getMediaSortByType({categoryType, mediaType, page}))
        } else {
            dispatch(mediaAction.getAll({id, page, categoryType, year}))
        }
    }, [dispatch, setQuery, query, id, state, categoryType, mediaType, year])

    return (
        <div className={'movies'}>
            <MediaCarousel categoryType={categoryType} timeWindow={trendingTimeWindow.day}/>
            <div className={'movies-card'}>
                <div className={'movies-title'}>
                    {
                        mediaPageTitle && <span>{mediaPageTitle}</span>
                    }
                </div>
                <div className={'movies-list'}>
                    {status && <div className={'main_loader'}><Loader/></div>}
                    {
                        medias.map(media => <Media key={media.id} media={media} categoryType={categoryType}/>)
                    }
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages}/>
            </div>
        </div>

    );
};

export {MediaPage}

