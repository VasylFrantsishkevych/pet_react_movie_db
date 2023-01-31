import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {genreActions, mediaAction} from "../../redux";
import {IGenres, IIndex} from "../../interfaces";
import {Loader, Media, MediaCarousel, Pagination} from "../../components";
import {trendingTimeWindow} from "../../constants";

import './Media.page.style.css';
const MediaPage: FC = () => {

    const {medias, status} = useAppSelector(state => state.movies);
    const {genre} = useAppSelector(state => state.genres);
    const {state} = useAppLocation<IGenres>();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {id, categoryType, mediaType} = useParams() as {id: string | undefined, categoryType: keyof IIndex, mediaType: string};

    useEffect(() => {
        if (state) {
            dispatch(genreActions.addGenre(state));
        }else if  (!query.get('page')){
            setQuery({page: '1'})
        }
        const page = query.get('page');
        if (mediaType) {
            dispatch(mediaAction.getMediaSortByType({categoryType, mediaType, page}))
        } else {
            dispatch(mediaAction.getAll({id, page, categoryType}))
        }
    }, [dispatch, setQuery, query, id, state, categoryType, mediaType])

    return (
        <div className={'movies'}>
            <MediaCarousel categoryType={categoryType} timeWindow={trendingTimeWindow.day}/>
            <div className={'movies__card'}>
                <div className={'movies__title'}>
                    {
                        genre && <span>{genre.name}</span>
                    }
                </div>
                <div className={'movies__list'}>
                    {status && <div className={'main_loader'}><Loader/></div>}
                    {
                        medias.map(media => <Media key={media.id} media={media} categoryType={categoryType}/>)
                    }
                </div>
                <Pagination/>
            </div>
        </div>

    );
};

export {MediaPage}

