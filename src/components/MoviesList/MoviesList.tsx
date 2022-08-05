import React, {FC, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import './MovieListStyle.css';
import {MovieListCard} from "../MovieListCard/MovieListCard";
import {genreActions, movieAction} from "../../redux";
import {Pagination} from "../Pagination/Pagination";
import {IGenres} from "../../interfaces";

const MoviesList: FC = () => {

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
                    movies.map(movie => <MovieListCard key={movie.id} movie={movie}/>)
                }
            </div>
            <Pagination/>
        </div>

    );
};

export {MoviesList}
