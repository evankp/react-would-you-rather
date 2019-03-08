import React from 'react'
import {connect} from "react-redux";

import {NavLink} from "react-router-dom";
import {clearAuthedUser} from "../actions/users";

class HeaderBar extends React.Component {
    handleLogout = e => {
      e.preventDefault();
      this.props.dispatch(clearAuthedUser())
    };

    render() {
        const {user} = this.props;
        return (
            <nav>
                <ul>
                    <li><NavLink to='/' activeClassName="active">Home</NavLink></li>
                    <li>New Question</li>
                    <li>Leader board</li>
                </ul>

                <div id="account-actions">
                    <img className="avatar" src={`/avatar/${user.avatarURL}.svg`}
                         alt={`${user.name} avatar`}/>
                    <span>Hey, {user.name.split(' ')[0]}</span>
                    <button onClick={this.handleLogout}>Log out</button>
                </div>
            </nav>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        user: users[authedUser],
        users
    }
}

export default connect(mapStateToProps)(HeaderBar)