import React from 'react'
import {answerQuestion} from "../actions/questions";
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";

class Choice extends React.Component {
    static propTypes = {
        choice: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        authedUser: PropTypes.string.isRequired
    };

    submitAnswer = (e, selection) => {
        const {question, authedUser, dispatch} = this.props;

        e.preventDefault();

        dispatch(answerQuestion(question.id, selection, authedUser));

        this.props.history.push(`/result/${question.id}`)
    };

    render() {
        const {question, choice} = this.props;
        const option = choice === 'A' ? 'optionOne' : 'optionTwo';

        return (
            <div className="answer">
                <h3>{question[option].text}</h3>
                <button className={choice === 'A' ? 'is-positive' : 'is-negative'}
                        onClick={e => this.submitAnswer(e, option)}>Choose
                </button>
            </div>
        )
    }
}

export default withRouter(Choice)