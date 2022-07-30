import {Outlet} from "react-router-dom";
import React, {FC} from "react";

import './MainLayoutStyle.css';
import {Header} from "../components";

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
                        </div>
                    </div>
                    <div className={'layout__outlet'}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {MainLayout};
