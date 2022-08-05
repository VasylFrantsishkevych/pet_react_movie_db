import React, {FC} from 'react';
import {Link} from "react-router-dom";

import './HeaderStyle.css';
import {useAppDispatch} from "../../hooks";
import {genreActions} from "../../redux";
import {useTheme} from "../../contextTheme";
import {UserInfo} from "../UserInfo/UserInfo";

const Header: FC = () => {

    const {themeType, setCurrentTheme} = useTheme();
    const dispatch = useAppDispatch();

    const deleteGenre = () => {
        dispatch(genreActions.addGenre(null))
    }

    const changeTheme = () => {
        if (themeType === 'dark') {
            setCurrentTheme('light')
        }else {
            setCurrentTheme('dark')
        }
    }

    return (
        <div className={'header'}>
            <div className={'header__logo'}>
                <div className={'user__info'}>
                    <UserInfo/>
                </div>
                <div className={'header__name'}>
                    <h1>The movie DB</h1>
                </div>
            </div>
            <div className={'header__menu'}>
                <div className={'header__menu_item'}>
                    <Link to={'/discover/movie'} onClick={() => deleteGenre()}>Movies</Link>
                </div>
                <div className={'theme__button'}>
                    <button onClick={() => changeTheme()}>{themeType === 'dark' ? 'Light' : 'Dark'}</button>
                </div>
            </div>
        </div>
    );
};

export {Header};
