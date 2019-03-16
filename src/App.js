import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoadingBar from "react-redux-loading";

import {getInitialData} from "./actions";

import Login from './components/login';
import Dashboard from './components/dashboard';
import {setAuthedUser} from './actions/users';
import NewQuestion from './components/new-question';
import Question from './components/question'
import Leaderboard from "./components/leaderboard"
import NotFound from "./components/404"

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(getInitialData());
        this.getSessionStoredUser()
    };

    getSessionStoredUser = () => {
      let loggedUser = sessionStorage.getItem('loggedUser');

      if (loggedUser) this.props.dispatch(setAuthedUser(loggedUser))
    };

    render() {
        const {authedUser} = this.props;
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading
                        ? null
                        : <Fragment>
                            <Route exact path='/' component={authedUser ? Dashboard : Login}/>
                            <Route path='/404' component={NotFound}/>
                            <Route path='/leaderboard' component={authedUser ? Leaderboard : Login}/>
                            <Route path='/question/:id' component={authedUser ? Question : Login}/>
                            <Route path='/add' component={authedUser ? NewQuestion : Login}/>

                            {/* Credit text for avatar icons*/}
                            <div className="credit-text">Database is reset daily</div>
                            <div className="credit-text">Avatar icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik </a>
                                from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> is licensed by
                                <a href="http://creativecommons.org/licenses/by/3.0/"title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer"> CC 3.0 BY</a></div>
                        </Fragment>
                    }
                </Fragment>
            </Router>
        );
    }
}

function mapStatetoProps({authedUser, users, loadingBar}) {
    return {
        loading: loadingBar.default,
        authedUser,
        users
    }
}

export default connect(mapStatetoProps)(App)
