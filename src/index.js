import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux'
import {Provider} from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import middleware from './middleware';

import './sass/styles.sass'

const store = Redux.createStore(reducers, middleware);

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
