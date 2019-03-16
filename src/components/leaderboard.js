import React from "react";
import HeaderBar from "./header-bar";
import {connect} from "react-redux";

import '../sass/leaderboard.sass'
import UserBox from "./user-box"

class Leaderboard extends React.Component {
    render() {
        console.log(Date.now())
        return (
            <div className="box full-sized">
                <HeaderBar/>

                <div className="separator"/>

                <section>
                    <header>
                        <h2>Leaderboard</h2>
                    </header>
                    <article>
                        <ul className="is-unstyled">
                            {this.props.users.map(user => (
                                <UserBox key={user.id} user={user}/>
                            ))}
                        </ul>
                    </article>
                </section>
            </div>
        )
    }
}

function mapStateToProps({users}, ownProps) {
    function userArray() {
        let userList = Object.keys(users).map(user => users[user])
        userList.forEach(user => {
            user.score = Object.keys(user.answers).length + Object.keys(user.questions).length
        })

        return userList.sort((a, b) => b.score - a.score)
    }

    return {
        users: userArray()
    }
}

export default connect(mapStateToProps)(Leaderboard)