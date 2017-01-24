import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import sensorsApp  from './modules/Redux/reducers'
import App from './modules/App'
import Home from './modules/components/Home'
import Sensor from './modules/components/Sensor'

let store = createStore(
    sensorsApp,
    applyMiddleware(
        thunkMiddleware
    ));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/sensor">
                    <IndexRoute component={Home}/>
                    <Route path="/sensor/:id" component={Sensor}/>
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root')
);