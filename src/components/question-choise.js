import React from 'react'
import {answerQuestion} from "../actions/questions";
import Proptypes from 'prop-types'

function submitAnswer(e, selection, props) {
    const {question, authedUser, dispatch} = props;

    e.preventDefault();

    dispatch(answerQuestion(question.id, selection, authedUser))
}

const Choice = props => {
    const {question, choice} = props;
    const option = choice === 'A' ? 'optionOne' : 'optionTwo';

    return (
        <div className="answer">
            <h3>{question[option].text}</h3>
            <button className={choice === 'A' ? 'is-positive' : 'is-negative'}
                    onClick={e => submitAnswer(e, option, props)}>Choose
            </button>
        </div>
    )
};

Choice.propTypes = {
    choice: Proptypes.string.isRequired,
    question: Proptypes.object.isRequired,
    dispatch: Proptypes.func.isRequired,
    authedUser: Proptypes.string.isRequired
};

export default Choice