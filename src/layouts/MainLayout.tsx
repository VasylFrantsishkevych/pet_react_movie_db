import {Outlet} from "react-router-dom";
import React, {FC} from "react";

import './MainLayoutStyle.css';
import {Genres, Header} from "../components";

const MainLayout: FC = () => {
    return (
        <div className={'wrap'}>
            <div className={'layout'}>
                <Header/>
                <div className={'container'}>
                    <div className={'categories'}>
                        <div className={'categories__title'}>
                            <h4>categories</h4>
                        </div>
                        <div className={'categories__genre'}>
                            <h5>genres</h5>
                            <Genres/>
                        </div>
                    </div>
                    <div className={'layout__outlet'}>
                        <Outlet/>
                    </div>
                </div>
                <div className={'footer'}></div>
            </div>
        </div>
    );
};

export {MainLayout};
