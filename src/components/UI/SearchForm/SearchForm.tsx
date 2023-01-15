import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import './SearchFormStyle.css';
import {useAppDispatch} from "../../../hooks";
import {searchAction} from "../../../redux";

type FormInputs = {
    searchText: string;
};

const SearchForm: FC = () => {

    const {handleSubmit, register, reset} = useForm<FormInputs>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const submit = (data: FormInputs) => {
        dispatch(searchAction.addSearchText(data.searchText))
        reset();
    }

    return (
        <form className={'search'} onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder="Search..." {...register('searchText')}/>
            <button onClick={() => navigate('/search/movie')}>Search</button>
        </form>
    );
};

export {SearchForm};