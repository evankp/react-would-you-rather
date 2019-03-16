import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class QuestionListItem extends React.Component {
    handleClick = e => {
        const {question, history} = this.props

        e.preventDefault()
        history.push(`/question/${question.id}`)
    }

    render() {
        const {users, question} = this.props
        let time = new Date(question.timestamp);
        time.setMonth(time.getMonth() + 1)

        return (
            <li key={question.id} className="tab-item">
                <h3 id="date">{`${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`}</h3>
                <div className="content">
                    <div className="info">
                        <img className="avatar" src={`/avatar/${users[question.author].avatarURL}.svg`}
                             alt={`${users[question.author].name} avatar`}/>
                        <span>{users[question.author].name.split(' ')[0]}</span>
                    </div>
                    <div className="options">
                        <div className="option">
                            <h4>Option One</h4>
                            <span>{question.optionOne.text}</span>
                        </div>
                        <div className="option">
                            <h4>Option Two</h4>
                            <span>{question.optionTwo.text}</span>
                        </div>
                    </div>
                    <button className="is-neutral" onClick={this.handleClick}>View Question</button>
                </div>
            </li>
        )
    }
}

function mapStateToProps({users}, ownProps) {
    return {
        users,
        question: ownProps.question
    }
}

export default withRouter(connect(mapStateToProps)(QuestionListItem))