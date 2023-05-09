import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import './SearchFormStyle.css';
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {searchAction} from "../../../redux";

type FormInputs = {
    searchText: string;
};

const SearchForm: FC = () => {

    const {handleSubmit, register, reset} = useForm<FormInputs>();
    const {searchText} = useAppSelector(state => state.search);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const submit = (data: FormInputs) => {
        console.log(data);
        dispatch(searchAction.addSearchText(data.searchText))
        console.log('+++++++')
        reset();
    }

    return (
        <form className={'search'} onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder="Search..." {...register('searchText')}/>
            <button onClick={() => navigate(`/search/multi&query=${searchText}`)}>Search</button>
        </form>
    );
};

export {SearchForm};