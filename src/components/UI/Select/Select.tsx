import React, {FC, ReactNode} from 'react';

interface IProps {
    defaultValue: string;
    value: number;
    onChange: (value: string) => void
    children: ReactNode;

}
const Select: FC<IProps> = ({defaultValue, value, onChange, children}) => {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {children}
        </select>
    );
};

export {Select};