import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {searchAction} from "../../redux";
import {Loader, Media, Pagination} from "../../components";
import '../Media.page/Media.page.style.css';
import {useSearchParams} from "react-router-dom";

const SearchPage: FC = () => {

    const {searchText, searchData, status, totalPages, currentPage} = useAppSelector(state => state.search);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();

    useEffect(() => {
        if (!query.get('page')) {
            setQuery({page: '1'})
        }
        const page = query.get('page');
        dispatch(searchAction.getSearchMovie({page, searchText}))
    }, [dispatch, searchText, query, setQuery])
    console.log(searchText);
    return (
        <div className={'movies'}>
            <div className={'movies__list'}>
                {status && <div className={'main_loader'}><Loader/></div>}
                {
                    searchData.length === 0
                        ? <h2>Not found</h2>
                        : searchData.map(media => <Media key={media.id} media={media}/>)
                }
            </div>
            <div>
                <Pagination currentPage={currentPage} totalPages={totalPages}/>
            </div>
        </div>
    );
};

export {SearchPage};