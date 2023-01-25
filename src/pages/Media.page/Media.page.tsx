import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {genreActions, mediaAction} from "../../redux";
import {IGenres, IIndex} from "../../interfaces";
import {CarouselMovies, Loader, Media, Pagination} from "../../components";
import {trendingTimeWindow} from "../../constants";

import './Media.page.style.css';
const MediaPage: FC = () => {

    const {medias, status} = useAppSelector(state => state.movies);
    const {genre} = useAppSelector(state => state.genres);
    const {state} = useAppLocation<IGenres>();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {id, type} = useParams() as {id: string | undefined, type: keyof IIndex};

    const timeWindow = trendingTimeWindow.day;

    useEffect(() => {
        if (state) {
            dispatch(genreActions.addGenre(state));
        }else if  (!query.get('page')){
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(mediaAction.getAll({id, page, type}))
    }, [dispatch, setQuery, query, id, state, type])

    return (
        <div className={'movies'}>
            <CarouselMovies timeWindow={timeWindow} typeMedia={type}/>
            <div className={'movies__card'}>
                <div className={'movies__title'}>
                    {
                        genre && <span>{genre.name}</span>
                    }
                </div>
                <div className={'movies__list'}>
                    {status && <div className={'main_loader'}><Loader/></div>}
                    {
                        medias.map(media => <Media key={media.id} media={media} categoryType={type}/>)
                    }
                </div>
                <Pagination/>
            </div>
        </div>

    );
};

export {MediaPage}

