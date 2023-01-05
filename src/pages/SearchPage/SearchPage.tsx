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
                    searchMovie.map(movie => <Movie key={movie.id} movie={movie}/>)
                }
                {searchText && !searchMovie ? <h2>No Movies Found</h2> : <h2>No Movies Found</h2>}
            </div>
        </div>
    );
};

export {SearchPage};