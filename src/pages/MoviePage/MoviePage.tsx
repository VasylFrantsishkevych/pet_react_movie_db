import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import './MoviePageStyle.css';
import {genreActions, movieAction} from "../../redux";
import {IGenres} from "../../interfaces";
import {Movie, Pagination} from "../../components";

const MoviePage: FC = () => {

    const {movies, status} = useAppSelector(state => state.movies);
    const {genre} = useAppSelector(state => state.genres);
    const {state} = useAppLocation<IGenres>();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const {id} = useParams();

    useEffect(() => {
        if (state) {
            dispatch(genreActions.addGenre(state));
        }else if  (!query.get('page')){
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(movieAction.getAllMovies({id, page}))
    }, [dispatch, setQuery, query, id, state])

    return (
        <div className={'movies'}>
            <div className={'movies__title'}>
                {
                    genre && <span>{genre.name}</span>
                }
            </div>
            <div className={'movies__list'}>
                {status && <h2>Loading...</h2>}
                {
                    movies.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
            </div>
            <Pagination/>
        </div>

    );
};

export {MoviePage}

