import {GET_QUESTIONS, NEW_QUESTION, REMOVE_VOTE, UPDATE_VOTES} from "../reducers/questions"
import * as API from '../utils/api'

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

export function newQuestion(question) {
    return {
        type: NEW_QUESTION,
        question
    }
}

export function updateVotes(id, option, user) {
    return {
        type: UPDATE_VOTES,
        id,
        option,
        user
    }
}

export function removeVote(id, option, user) {
    return {
        type: REMOVE_VOTE,
        id,
        option,
        user
    }
}

export const answerQuestion = (id, selection, authedUser) => dispatch => {
    dispatch(updateVotes(id, selection, authedUser));

    return API.answerQuestion({id, answer: selection, authedUser})
        .catch(err => {
            dispatch(removeVote(id, selection, authedUser));
            console.log('Error: ', err)
        })
};