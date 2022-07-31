import React, {FC} from 'react';
import {Link, useSearchParams} from "react-router-dom";

import './PaginationStyle.css';
import {useAppSelector} from "../../hooks";
import {createPages} from "./createPage";


const Pagination: FC = () => {

    const {currentPage, totalPages} = useAppSelector(state => state.movies);
    const [params]: any = useSearchParams();
    const pages: Array<number> = [];

    createPages(pages, totalPages, currentPage)

    return (
        <div className={'paginator'}>
            <Link to={`?page=${+params.get('page') - 1}`}><button className={'button'}>Prev</button></Link>
            {
                pages.map((page, index) => <Link to={`?page=${page}` } key={index}><button
                    className={currentPage === page ? 'current_page' : 'page'}>{page}</button></Link> )
            }
            <Link to={`?page=${+params.get('page') + 1}`}><button className={'button'}>Next</button></Link>
        </div>
    );
};

export {Pagination}
