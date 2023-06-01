import React, {FC} from 'react';
import {Link, useSearchParams} from "react-router-dom";

import './Pagination.scss';
import {createPages} from "./createPage";

interface IProps {
    totalPages: number;
    currentPage: number;
}

const Pagination: FC<IProps> = ({totalPages, currentPage}) => {

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
