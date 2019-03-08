import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route} from "react-router-dom";
import LoadingBar from "react-redux-loading";

import {getInitialData} from "./actions";

import Login from './components/login'
import Dashboard from './components/dashboard'

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(getInitialData());
    };

    render() {
        const {authedUser} = this.props;
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    {this.props.loading
                        ? null
                        : <div>
                            <Route exact path='/' component={authedUser ? Dashboard : Login}/>

                            {/* Credit text for avatar icons*/}
                            <div className="credit-text">Avatar icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik </a>
                                from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> is licensed by
                                <a href="http://creativecommons.org/licenses/by/3.0/"title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer"> CC 3.0 BY</a></div>
                        </div>
                    }
                </Fragment>
            </Router>
        );
    }
}

function mapStatetoProps({authedUser, users, questions}) {
    return {
        loading: users === {},
        authedUser,
        users
    }
}

export default connect(mapStatetoProps)(App)
