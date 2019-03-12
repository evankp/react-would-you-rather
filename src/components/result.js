import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import HeaderBar from './header-bar'
import ResultAnswer from "./result-answer";

class Result extends React.Component {
    render() {
        const {user, questions, question, users} = this.props;

        if (questions) {
            return (
                <div className="box full-sized">
                    {user && (
                        <Fragment>
                            <HeaderBar/>
                            <div className="separator"/>
                        </Fragment>
                    )}

                    <section>
                        <header>
                            <h2>Would you Rather?</h2>
                        </header>

                        {question !== undefined && (
                            <div id="author-details">
                                <div>
                                    <img className="avatar" src={`/avatar/${users[question.author].avatarURL}.svg`}
                                         alt={`${users[question.author]} avatar`}/>
                                    <span>{users[question.author].name}</span>
                                </div>
                            </div>
                        )}

                        <article className="question-box">
                            {question !== undefined
                                ? <Fragment>
                                    <ResultAnswer question={question} option="one"/>
                                    <div className="or-text">
                                        <span>OR</span>
                                    </div>
                                    <ResultAnswer question={question} option="two"/>
                                </Fragment>
                                : <span className="answer">No Questions Found</span>}
                        </article>
                    </section>
                </div>
            )
        } else {
            return null
        }
    }
}

function mapStateToProps({authedUser, users, questions}, ownProps) {
    const {match: {params}} = ownProps;
    const question = questions[params.id];

    return {
        user: users[authedUser],
        authedUser,
        users,
        questions,
        question
    }
}

export default withRouter(connect(mapStateToProps)(Result))