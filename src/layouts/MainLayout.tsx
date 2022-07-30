import {Outlet} from "react-router-dom";
import {FC} from "react";

import './MainLayoutStyle.css';
import {Header} from "../components";

const MainLayout: FC = () => {
    return (
        <div className={'wrap'}>
            <div className={'layout'}>
                <Header/>
                <Outlet/>
            </div>
        </div>
    );
};

export {MainLayout};
