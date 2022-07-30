import React, {FC} from 'react';
import {Link} from "react-router-dom";

import './HeaderStyle.css';

const Header: FC = () => {
    return (
        <div className={'header'}>
            <div className={'header__name'}>
                <h1>The movie DB</h1>
            </div>
            <div className={'header__menu'}>
                <div className={'header__menu_item'}>
                    <Link to={'/discover/movie'}>Movies</Link>
                </div>
            </div>
        </div>
    );
};

export {Header};
