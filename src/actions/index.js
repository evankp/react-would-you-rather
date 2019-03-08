import * as API from '../utils/api';
import {getUsers} from "./users";
import {getQuestions} from "./questions";
import {showLoading, hideLoading} from "react-redux-loading";

export const getInitialData = () => dispatch => {
    dispatch(showLoading());

    return API.getInitialData()
        .then(({users, questions}) => {
            dispatch(getUsers(users));
            dispatch(getQuestions(questions));
            dispatch(hideLoading())
        })
};