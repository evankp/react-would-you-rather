import React, {Fragment} from 'react';
import {connect} from "react-redux";

import HeaderBar from './header-bar'
import Choice from "./question-choice";

const sample = require('lodash.sample');

class Dashboard extends React.Component {
    render() {
        const {dispatch, authedUser, questionAuthor, users, questions, randomQuestion, match: {path, params}} = this.props;
        const user = users[authedUser];

        const question = path.includes('/result') ? questions[params.id] : randomQuestion;

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
                        {question !== undefined
                            ? <Fragment>
                                <Choice choice="A" question={question} dispatch={dispatch} authedUser={authedUser}/>
                                <div className="or-text">
                                    <span>OR</span>
                                </div>
                                <Choice choice="B" question={question} dispatch={dispatch} authedUser={authedUser}/>
                            </Fragment>
                            : <span className="answer">No Questions Found</span>}
                    </article>
                </section>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, ownProps) {
    function getRandomQuestion() {
        let questionIds = Object.keys(questions);
        let unansweredQuestions = questionIds.filter(id => {
            let question = questions[id];
            return (!question.optionOne.votes || !question.optionOne.votes.includes(authedUser)) &&
                (!question.optionTwo.votes || !question.optionTwo.votes.includes(authedUser))
        });

        return questions[sample(unansweredQuestions)]
    }

    let randomQuestion = getRandomQuestion();

    return {
        authedUser,
        users,
        questions,
        randomQuestion: randomQuestion,
    }
}

export default connect(mapStateToProps)(Dashboard)