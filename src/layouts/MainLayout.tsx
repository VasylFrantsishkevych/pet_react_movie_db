import {Outlet} from "react-router-dom";
import React, {CSSProperties, FC} from "react";

import './MainLayoutStyle.css';
import {Header} from "../components";
import {useTheme} from "../components";

const MainLayout: FC = () => {
    const {theme} = useTheme();

    return (
        <div className={'wrap'} style={{...theme} as CSSProperties}>
            <div className={'layout'}>
                <Header/>
                <div className={'container'}>
                    {/*<div className={'categories'}>*/}
                    {/*    <div className={'categories__title'}>*/}
                    {/*        <h4>categories</h4>*/}
                    {/*    </div>*/}
                    {/*    <div className={'categories__genre'}>*/}
                    {/*        <h5>genres</h5>*/}
                    {/*        <Genres/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
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
