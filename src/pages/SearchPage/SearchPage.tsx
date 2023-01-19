import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {searchAction} from "../../redux";
import {Loader, Media, Pagination} from "../../components";
import '../Media.page/Media.page.style.css';
import {useSearchParams} from "react-router-dom";

const SearchPage: FC = () => {

    const {searchText, searchMovie, status} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(searchAction.getSearchMovie({page, searchText}))
    }, [dispatch, searchText, query, setQuery])

    return (
        <div className={'movies'}>
            <div className={'movies__list'}>
                {status && <div className={'main_loader'}><Loader/></div>}
                {
                    searchMovie.length === 0
                        ? <h2>Movies not found</h2>
                        : searchMovie.map(movie => <Media key={movie.id} media={movie}/>)
                }
            </div>
            <div>
                <Pagination/>
            </div>
        </div>
    );
};

export {SearchPage};