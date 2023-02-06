import React, {FC} from 'react';
import {Select} from "../UI";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {mediaAction} from "../../redux";
import {getYears} from "../../utils";
import {Link} from "react-router-dom";
import {IIndex} from "../../interfaces";

interface IProps {
    categoryType: keyof IIndex;
}

const YearsSelect: FC<IProps> = ({categoryType}) => {

    const {year} = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();

    const yearOptions = getYears(30)

    const handleChange = (value: string) => {
        dispatch(mediaAction.addYear(value))
    }

    return (
        <Select defaultValue={'By Years'} value={year} onChange={handleChange}>
            {
                yearOptions.map(year =>
                    <option key={year} value={year}>
                        <Link to={`/discover/${categoryType}&language=en-US&year=${year}`} state={year}>
                            {year}
                        </Link>
                    </option>
                )
            }
        </Select>
    );
};

export {YearsSelect};