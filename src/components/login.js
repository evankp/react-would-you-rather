import React from 'react'
import {connect} from "react-redux";

import {setAuthedUser} from "../actions/users";

class Login extends React.Component {
    state = {
        userSelect: 'none'
    };

    onChange = e => {
        e.preventDefault();
        this.setState({userSelect: this.select.value}, () => {
            this.props.dispatch(setAuthedUser(this.state.userSelect));
        })
    };

    render() {
        const {users} = this.props;

        return (
            <div className="box">
                <h2>Welcome</h2>
                <h3>Select User</h3>
                <select value={this.state.userSelect} className="user-select" onChange={this.onChange}
                        ref={select => this.select = select}>

                    <option value='none' disabled={true}>-- Select User --</option>
                    {Object.keys(users).map(user => <option key={users[user].id} value={users[user].id}>
                        {users[user].name}
                    </option>)}

                </select>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Login)