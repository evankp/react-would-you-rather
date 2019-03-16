import React from 'react';
import PropTypes from 'prop-types';

class UserBox extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    render() {
        const {user} = this.props

        return (
            <li className="user-box">
                <div className="avatar-section">
                    <img className="avatar is-medium" src={`/avatar/${user.avatarURL}.svg`}
                         alt={`${user.name} avatar`}/>
                </div>
                <div className="user-info">
                    <h3>{user.name}</h3>
                    <div className="user-points">
                        <span>Questions Answered: <b>{Object.keys(user.answers).length}</b></span>
                        <span>Questions Created: <b>{Object.keys(user.questions).length}</b></span>
                    </div>
                </div>
                <div className="score-section">
                    <h3>Score</h3>
                    <b className="score">{Object.keys(user.answers).length + Object.keys(user.questions).length}</b>
                </div>
            </li>
        )
    }
}

export default UserBox