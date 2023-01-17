import React, {FC, ReactNode} from 'react';

import {urlSize} from "../../../constants";
import {ICast} from "../../../interfaces";

interface IProps {
    cast: ICast,
    children?: ReactNode,
}
const Cast: FC<IProps> = ({cast}) => {

    const {profile_path, original_name} = cast;

    return (
        <div>
            <img src={`${urlSize.w200}${profile_path}`} alt={original_name}/>
            <p>{original_name}</p>
        </div>
    );
};

export {Cast};