import React, {FC} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/thumb76_76.png";
import './HeaderStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions} from "../../redux";
import {useTheme} from "../Theme";
import {SearchForm} from "../UI";
import {Genres} from "../Genres/Genres";
import {category, movieType, tvType} from "../../constants";
import {IIndex} from "../../interfaces";

const Header: FC = () => {
    const {themeType, setCurrentTheme} = useTheme();
    const dispatch = useAppDispatch();
    const {genres: {genresMovie, genresTv}} = useAppSelector(state => state.genres);

    const movieCategory = category.movie as keyof IIndex;
    const tvCategory = category.tv as keyof IIndex;
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
            <Link to={'/home'} className={'header__logo'}>
                <img src={logo} alt="movieDB"/>
            </Link>
            <div className={'menu'}>
                <ul className={'menu__list'}>
                    <li>
                        <Link to={`/discover/${movieCategory}`} onClick={() => deleteGenre()}>Movies</Link>
                        <div className={'sub__menu'}>
                            <div className={'sub__menu_container'}>
                                <div className={'sub__menu_movies'}>
                                    <ul>
                                        <li>
                                            <Link to={`/sort/${movieCategory}${movieType.topRated}`}>Top Rated</Link>
                                        </li>
                                        <li>
                                            <Link to={`/sort/${movieCategory}${movieType.upcoming}`}>Upcoming</Link>
                                        </li>
                                        <li>
                                            <Link to={`/sort/${movieCategory}${movieType.nowPlaying}`}>Now Playing</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={'sub__menu_genre'}>
                                    <Genres categoryType={movieCategory} genres={genresMovie}/>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to={`/discover/${tvCategory}`} onClick={() => deleteGenre()}>Show TV</Link>
                        <div className={'sub__menu'}>
                            <div className={'sub__menu_container'}>
                                <div className={'sub__menu_movies'}>
                                    <ul>
                                        <li>
                                            <Link to={`/sort/${tvCategory}${tvType.topRated}`}>Top Rated</Link>
                                        </li>
                                        <li>
                                            <Link to={`/sort/${tvCategory}${tvType.onTheAir}`}>On The Air</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className={'sub__menu_genre'}>
                                    <Genres categoryType={tvCategory} genres={genresTv}/>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={'search__form'}>
                <SearchForm/>
            </div>
            <div className={'theme__button'}>
                <button onClick={() => changeTheme()}>{themeType === 'dark' ? 'Light' : 'Dark'}</button>
            </div>
        </div>
    );
};

export {Header};
