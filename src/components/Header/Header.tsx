import React, {FC} from 'react';

import './HeaderStyle.css';
import {useAppDispatch} from "../../hooks";
import {genreActions} from "../../redux";
import {useTheme} from "../Theme";
import {SearchForm} from "../UI";
import {Link} from "react-router-dom";
import {Genres} from "../Genres/Genres";

const Header: FC = () => {
    const {themeType, setCurrentTheme} = useTheme();
    const dispatch = useAppDispatch();

    const deleteGenre = () => {
        dispatch(genreActions.addGenre(null))
    }

    const changeTheme = () => {
        if (themeType === 'dark') {
            setCurrentTheme('light')
        } else {
            setCurrentTheme('dark')
        }
    }
    return (
        <div className={'header'}>
            <div className={'header__logo'}>
                <div className={'header__name'}>
                    <h1>The movie DB</h1>
                </div>
                <div className={'theme__button'}>
                    <button onClick={() => changeTheme()}>{themeType === 'dark' ? 'Light' : 'Dark'}</button>
                </div>
            </div>
            <div className={'main__menu'}>
                <div className={'menu'}>
                    <ul className={'menu__list'}>
                        <li>
                            <Link to={'/discover/movie'} onClick={() => deleteGenre()}>Movies</Link>
                            <div className={'sub__menu'}>
                                <div className={'sub__menu_container'}>
                                    <div className={'sub__menu_movies'}>
                                        <ul>
                                            <li>
                                                <Link to={'/movie/top_rated'}>Top Rated</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={'sub__menu_genre'}>
                                        <Genres/>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Link to={'/discover/movie'} onClick={() => deleteGenre()}>Show TV</Link>
                            {/*<div className={'sub__menu'}>*/}
                            {/*    <div className={'sub__menu_container'}>*/}
                            {/*        <div className={'sum__menu_genre'}>*/}

                            {/*        </div>*/}
                            {/*        <div className={'sub_menu_rating'}>*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </li>
                    </ul>
                </div>
                <div className={'search__form'}>
                    <SearchForm/>
                </div>
            </div>
        </div>
    );
};

export {Header};
