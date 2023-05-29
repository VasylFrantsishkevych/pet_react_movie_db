import {Outlet} from "react-router-dom";
import React, {CSSProperties, FC} from "react";

import './MainLayout.scss';
import {Header} from "../components";
import {useTheme} from "../components";

const MainLayout: FC = () => {
    const {theme} = useTheme();

    return (
        <div className={'container'} style={{...theme} as CSSProperties}>
            <div className={'layout'}>
                <Header/>
                <div className={'wrap'}>
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
