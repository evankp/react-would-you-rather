import React from 'react'
import PropTypes from 'prop-types';

export default class ResultAnswer extends React.Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
        option: PropTypes.string.isRequired
    };

    render() {
        const {question, option} = this.props;
        const selection = option === 'one' ? question.optionOne : question.optionTwo;

        return (
            <div className="answer">
                <h3>{selection.text}</h3>
                <h4>{selection.votes ? selection.votes.length : 0}</h4>
            </div>
        )
    }
}