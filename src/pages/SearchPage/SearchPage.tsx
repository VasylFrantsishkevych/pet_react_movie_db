import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {searchAction} from "../../redux";
import {Loader, Movie} from "../../components";
import '../MoviePage/MoviePageStyle.css';

const SearchPage: FC = () => {

    const {searchText, searchMovie, status} = useAppSelector(state => state.search);

    const dispatch = useAppDispatch();

    const page = '1';

    useEffect(() => {
        dispatch(searchAction.getSearchMovie({page, searchText}))
    }, [dispatch, searchText])
    console.log(searchMovie)
    return (
        <div className={'movies'}>
            <div className={'movies__list'}>
                {status && <div className={'main_loader'}><Loader/></div>}
                {
                    searchMovie.length === 0
                        ? <h2>Movies not found</h2>
                        : searchMovie.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
            </div>
        </div>
    );
};

export {SearchPage};