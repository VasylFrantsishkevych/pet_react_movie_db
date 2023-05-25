import React, {FC} from 'react';
import {Link} from "react-router-dom";

import logo from "../../assets/thumb76_76.png";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {useTheme} from "../Theme";
import {SearchForm} from "../UI";
import {Genres} from "../Genres/Genres";
import {category, movieType, tvType} from "../../constants";
import {IIndex} from "../../interfaces";
import {YearsSelect} from "../YearsSelect/YearsSelect";

import styles from './Header.module.scss';

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
        <div className={styles['header']}>
            <Link to={'/home'} className={styles['header-logo']}>
                <img src={logo} alt="movieDB"/>
            </Link>
            <div className={styles['main-menu']}>
                <ul className={styles['main-menu_list']}>
                    <li>
                        <Link to={`/discover/${movieCategory}`} onClick={() => addMediaTitle('Movie')}>Movies</Link>
                        <div className={styles['sub-menu']}>
                            <div className={styles['sub-menu_container']}>
                                <div className={styles['media-category']}>
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
                                    <div className={styles['select-years']}>
                                        <span>By Year</span>
                                        <YearsSelect categoryType={movieCategory}/>
                                    </div>
                                </div>
                                <div className={styles['media-genre']}>
                                    <Genres categoryType={movieCategory} genres={genresMovie}/>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to={`/discover/${tvCategory}`} onClick={() => addMediaTitle('TV Show')}>Show TV</Link>
                        <div className={styles['sub-menu']}>
                            <div className={styles['sub-menu_container']}>
                                <div className={styles['media-category']}>
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
                                    <div className={styles['select-years']}>
                                        <span>By Year</span>
                                        <YearsSelect categoryType={tvCategory}/>
                                    </div>
                                </div>
                                <div className={styles['media-genre']}>
                                    <Genres categoryType={tvCategory} genres={genresTv}/>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className={styles['search-form']}>
                <SearchForm/>
            </div>
            <div className={styles['theme-button']}>
                <button onClick={() => changeTheme()}>{themeType === 'dark' ? 'Light' : 'Dark'}</button>
            </div>
        </div>
    );
};

export {Header};
