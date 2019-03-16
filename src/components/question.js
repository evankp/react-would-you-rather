import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Choice from './question-choice';
import HeaderBar from './header-bar';

class Question extends React.Component {
    render() {
        const {question, user, questionAuthor, questionAnswered} = this.props

        if (question === undefined) return <Redirect to="/404"/>
        return (
            <div className="box full-sized">
                <HeaderBar/>

                <div className="separator"/>

                <section>
                    <header>
                        <h2>Would you Rather?</h2>
                    </header>
                    {questionAuthor && (
                        <div id="author-details">
                            <div>
                                <img className="avatar" src={`/avatar/${questionAuthor.avatarURL}.svg`}
                                     alt={`${questionAuthor.name} avatar`}/>
                                <span>{questionAuthor.id === user.id ? 'You' : questionAuthor.name}</span>
                            </div>
                        </div>
                    )}

                    <article className="question-box">
                        <Fragment>
                            <Choice choice="A" question={question.id} answered={questionAnswered}/>
                            <div className="or-text">
                                <span>OR</span>
                            </div>
                            <Choice choice="B" question={question.id} answered={questionAnswered}/>
                        </Fragment>
                    </article>
                </section>
            </div>
        )
    }
}

function mapStateToProps({users, questions, authedUser}, ownProps) {
    let question = questions[ownProps.match.params.id]
    let user = users[authedUser]
    let questionAnswered,
        questionAuthor

    if (question) {
        questionAnswered = !!((question.optionOne.votes && question.optionOne.votes.indexOf(user.id) !== -1) ||
            (question.optionTwo.votes && question.optionTwo.votes.indexOf(user.id) !== -1))

        questionAuthor = users[question.author]
    }

    return {
        user: user,
        question: question,
        questionAuthor,
        questionAnswered
    }
}

export default connect(mapStateToProps)(Question)