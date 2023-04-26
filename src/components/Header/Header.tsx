import React, {FC} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/thumb76_76.png";
import './HeaderStyle.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {useTheme} from "../Theme";
import {SearchForm} from "../UI";
import {Genres} from "../Genres/Genres";
import {category, movieType, tvType} from "../../constants";
import {IIndex} from "../../interfaces";
import {YearsSelect} from "../YearsSelect/YearsSelect";

const Header: FC = () => {
    const {themeType, setCurrentTheme} = useTheme();
    const dispatch = useAppDispatch();
    const {genres: {genresMovie, genresTv}} = useAppSelector(state => state.genres);

    const movieCategory = category.movie as keyof IIndex;
    const tvCategory = category.tv as keyof IIndex;
    const addMediaTitle = (title: string) => {
        dispatch(mediaAction.addMediaPageTitle(title))
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
                        <Link to={`/discover/${movieCategory}`} onClick={() => addMediaTitle('Movie')}>Movies</Link>
                        <div className={'sub__menu'}>
                            <div className={'sub__menu_container'}>
                                <div className={'sub__menu_movies'}>
                                    <ul>
                                        <li>
                                            <Link
                                                to={`/sort/${movieCategory}${movieType.topRated}`}
                                                onClick={() => addMediaTitle('Top Rated')}
                                            >
                                                Top Rated
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`/sort/${movieCategory}${movieType.upcoming}`}
                                                onClick={() => addMediaTitle('Upcoming')}
                                            >
                                                Upcoming
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`/sort/${movieCategory}${movieType.nowPlaying}`}
                                                onClick={() => addMediaTitle('Now Playing')}
                                            >
                                                Now Playing
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className={'select-years'}>
                                        <span>By Year</span>
                                        <YearsSelect categoryType={movieCategory}/>
                                    </div>
                                </div>
                                <div className={'sub__menu_genre'}>
                                    <Genres categoryType={movieCategory} genres={genresMovie}/>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to={`/discover/${tvCategory}`} onClick={() => addMediaTitle('TV Show')}>Show TV</Link>
                        <div className={'sub__menu'}>
                            <div className={'sub__menu_container'}>
                                <div className={'sub__menu_movies'}>
                                    <ul>
                                        <li>
                                            <Link
                                                to={`/sort/${tvCategory}${tvType.topRated}`}
                                                onClick={() => addMediaTitle('Top Rated')}
                                            >
                                                Top Rated
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to={`/sort/${tvCategory}${tvType.onTheAir}`}
                                                onClick={() => addMediaTitle('On The Air')}
                                            >
                                                On The Air
                                            </Link>
                                        </li>
                                    </ul>
                                    <div className={'select-years'}>
                                        <span>By Year</span>
                                        <YearsSelect categoryType={tvCategory}/>
                                    </div>
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
