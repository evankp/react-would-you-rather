import React from 'react'
import {connect} from 'react-redux'

import HeaderBar from './header-bar'

import '../sass/dashboard.sass'
import QuestionListItem from "./question-list-item"

class Dashboard extends React.Component {
    state = {
        activeTab: 'new'
    }

    handleSwitchTabs = e => {
        e.preventDefault()
        this.setState({activeTab: e.target.id})
    }

    render() {
        const {newQuestions, answeredQuestions} = this.props

        return (
            <div className="box full-sized">
                <HeaderBar/>

                <div className="separator"/>

                <section>
                    <header>
                        <h2>Questions</h2>
                    </header>

                    <article>
                        <div id="tab-controls">
                            <div className={this.state.activeTab === 'new' ? 'tab-select active' : 'tab-select'}
                                onClick={this.handleSwitchTabs}>
                                <h3 id="new">New</h3>
                            </div>
                            <div className={this.state.activeTab === 'answered' ? 'tab-select active' : 'tab-select'}
                                onClick={this.handleSwitchTabs}>
                                <h3 id="answered">Answered</h3>
                            </div>
                        </div>

                        <ul id="tab-list">
                            {this.state.activeTab === 'new'
                            ? newQuestions.map(question => (
                                <QuestionListItem key={question.id} question={question}/>
                            ))
                            : answeredQuestions.map(question => (
                                <QuestionListItem key={question.id} question={question}/>
                            ))}
                        </ul>
                    </article>

                </section>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}) {
    function sortQuestions() {
        let unansweredQuestionIds = Object.keys(questions).filter(question => (
            (!questions[question].optionOne.votes || questions[question].optionOne.votes.indexOf(authedUser) === -1) &&
            (!questions[question].optionTwo.votes || questions[question].optionTwo.votes.indexOf(authedUser) === -1))
        )

        let answeredQuestionIds = Object.keys(questions).filter(question => (
            (questions[question].optionOne.votes && questions[question].optionOne.votes.indexOf(authedUser) !== -1) ||
            (questions[question].optionTwo.votes && questions[question].optionTwo.votes.indexOf(authedUser) !== -1))
        )

        return {
            unansweredQuestions: unansweredQuestionIds.map(question => questions[question]),
            answeredQuestions: answeredQuestionIds.map(question => questions[question])
        }
    }

    return {
        authedUser,
        users,
        questions,
        newQuestions: sortQuestions().unansweredQuestions,
        answeredQuestions: sortQuestions().answeredQuestions
    }
}

export default connect(mapStateToProps)(Dashboard)