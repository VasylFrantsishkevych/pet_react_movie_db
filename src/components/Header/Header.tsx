import React, {FC} from 'react';
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <div>
            <Link to={'/discover/movie'}>Movies</Link>
        </div>
    );
};

export {Header};
