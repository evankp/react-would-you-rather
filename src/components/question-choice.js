import React, {Fragment} from 'react'
import {answerQuestion} from "../actions/questions"
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class Choice extends React.Component {
    static propTypes = {
        choice: PropTypes.string.isRequired,
        question: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        answered: PropTypes.bool.isRequired,
    }

    submitAnswer = (e, selection) => {
        const {question, user, dispatch} = this.props

        e.preventDefault()

        dispatch(answerQuestion(question.id, selection, user.id))
        this.setState({userChoice: selection})
    }

    render() {
        const {question, choice, answered, userChoice} = this.props
        const option = choice === 'A' ? 'optionOne' : 'optionTwo'

        /*
        * 1. Any option one votes?
        *   1a. is there any option two votes?
        *       If so add the two together, else return option one votes
        *   1b. If there is no option one votes, is there any option two votes?
        *       If so return option two length, else return 0
        * */
        const totalVotes = (question.optionOne.votes
            ? (question.optionTwo.votes
                ? question.optionOne.votes.length + question.optionTwo.votes.length
                : question.optionOne.votes.length)
            : (question.optionTwo.votes
                ? question.optionTwo.votes.length
                : 0))

        return (
            <div className="answer">
                <h4>{userChoice === option ? 'Your Choice' : null}</h4>
                <h3>{question[option].text}</h3>
                {!answered && (
                    <button className={choice === 'A' ? 'is-positive' : 'is-negative'}
                            onClick={e => this.submitAnswer(e, option)}>Choose
                    </button>
                )}

                {answered && (
                    <Fragment>
                        <h3>{question[option].votes ? question[option].votes.length : 0}</h3>
                        <h3>{question[option].votes ? `${Math.round((question[option].votes.length / totalVotes) * 100)}%` : '0%'}</h3>
                    </Fragment>
                )}
            </div>
        )
    }
}

function mapStateToProps({questions, users, authedUser}, ownProps) {
    const user = users[authedUser],
        question = questions[ownProps.question]

    return {
        user,
        answered: ownProps.answered,
        question,
        choice: ownProps.choice,
        userChoice: user.answers ? user.answers[question.id] : 'none'
    }
}

export default connect(mapStateToProps)(Choice)