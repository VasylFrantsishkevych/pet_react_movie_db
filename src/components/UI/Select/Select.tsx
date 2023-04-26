import React, {ChangeEventHandler, FC, ReactNode} from 'react';

interface IProps {
    children: ReactNode;
    onChange: ChangeEventHandler<HTMLSelectElement>;

}

const Select: FC<IProps> = ({onChange, children}) => {
    return (
        <select
            onChange={onChange}
        >
            {children}
        </select>
    );
};

export {Select};