import React from 'react'
import {answerQuestion} from "../actions/questions"
import PropTypes from 'prop-types'

class Choice extends React.Component {
    static propTypes = {
        choice: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        answered: PropTypes.bool.isRequired,
        userChoice: PropTypes.string.isRequired
    }

    state = {
        userChoice: 'none'
    }

    submitAnswer = (e, selection) => {
        const {question, user, dispatch} = this.props

        e.preventDefault()

        dispatch(answerQuestion(question.id, selection, user.id))
        this.setState({userChoice: selection})
    }

    componentDidMount() {
        this.setState({userChoice: this.props.userChoice})
    }

    render() {
        const {question, choice, answered} = this.props;
        const option = choice === 'A' ? 'optionOne' : 'optionTwo';

        return (
            <div className="answer">
                <h4>{this.state.userChoice === option ? 'Your Choice' : null}</h4>
                <h3>{question[option].text}</h3>
                {!answered && (
                    <button className={choice === 'A' ? 'is-positive' : 'is-negative'}
                            onClick={e => this.submitAnswer(e, option)}>Choose
                    </button>
                )}

                {answered && (
                    <h3>{question[option].votes ? question[option].votes.length : 0}</h3>
                )}
            </div>
        )
    }
}

export default Choice