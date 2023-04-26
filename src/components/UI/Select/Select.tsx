import React, {ChangeEventHandler, FC, ReactNode} from 'react';

interface IProps {
    children: ReactNode;
    defaultValue: string;
    onChange: ChangeEventHandler<HTMLSelectElement>;
    value: number;

}

const Select: FC<IProps> = ({defaultValue, value, onChange, children}) => {
    return (
        <select
            value={value}
            onChange={onChange}
        >
            <option disabled value="">{defaultValue}</option>
            {children}
        </select>
    );
};

export {Select};