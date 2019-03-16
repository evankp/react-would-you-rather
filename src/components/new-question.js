import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'

import HeaderBar from "./header-bar";
import {saveQuestion} from '../utils/api';

import '../sass/new-question.sass'
import {updateCreatedQuestions} from "../actions/users"
import {newQuestion} from "../actions/questions"

class NewQuestion extends React.Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        saveQuestion(this.props.authedUser, this.state.optionOne, this.state.optionTwo)
            .then(question => {
                this.props.dispatch(updateCreatedQuestions(this.props.authedUser, question.id))
                this.props.dispatch(newQuestion(question))
                this.props.history.push('/')
            })
            .then(() => alert('Question added!'))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="box full-sized">
                <HeaderBar/>

                <div className="separator"/>

                <section>
                    <header>
                        <h2>New Question</h2>
                    </header>

                    <article className='center-form'>
                        <form onSubmit={this.handleSubmit}>
                            <input id='optionOne' name='optionOne' placeholder='Option One' onChange={this.handleChange} required/>
                            <input id='optionTwo' name='optionTwo' placeholder='Option Two' onChange={this.handleChange} required/>
                            <button className='is-positive' disabled={!(this.state.optionOne && this.state.optionTwo)}>
                                Submit
                            </button>
                        </form>
                    </article>
                </section>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))