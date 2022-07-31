import React, {FC} from 'react';
import {Link} from "react-router-dom";

import './HeaderStyle.css';
import {useAppDispatch} from "../../hooks";
import {genreActions} from "../../redux";

const Header: FC = () => {

    const dispatch = useAppDispatch();

    const deleteGenre = () => {
        dispatch(genreActions.addGenre(null))
    }

    return (
        <div className={'header'}>
            <div className={'header__name'}>
                <h1>The movie DB</h1>
            </div>
            <div className={'header__menu'}>
                <div className={'header__menu_item'}>
                    <Link to={'/discover/movie'} onClick={() => deleteGenre()}>Movies</Link>
                </div>
            </div>
        </div>
    );
};

export {Header};
