import React, {FC, ReactNode} from 'react';

import './ButtonStyle.css';

interface IProps {
    children?: ReactNode,
    onClick: () => void,
}

const Button: FC<IProps> = ({children, ...props}) => {
    return (
        <button {...props} className={'button__custom'}>
            {children}
        </button>
    );
};

export {Button};