import React, {ChangeEvent, FC} from 'react';
import {Select} from "../UI";
import {useAppDispatch} from "../../hooks";
import {mediaAction} from "../../redux";
import {getYears} from "../../utils";
import {IIndex} from "../../interfaces";

import {useNavigate} from "react-router-dom";

interface IProps {
    categoryType: keyof IIndex;
}

const YearsSelect: FC<IProps> = ({categoryType}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const yearOptions = getYears(30)

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const yearForSort = e.target.value
        dispatch(mediaAction.addYear(yearForSort))
        dispatch(mediaAction.addMediaPageTitle(
            categoryType === 'movie' ? `Movie --- ${yearForSort}` : `TV --- ${yearForSort}`)
        )
        navigate(`/discover/${categoryType}&language=en-US&year=${yearForSort}`)
    }

    return (
        <Select onChange={handleChange}>
            {
                yearOptions.map(year =>
                    <option
                        key={year}
                        value={year}
                    >
                        {year}
                    </option>
                )
            }
        </Select>
    );
};

export {YearsSelect};