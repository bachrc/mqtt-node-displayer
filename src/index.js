import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import sensorsApp  from './modules/Redux/reducers'
import StaticApp from './modules-api/App'
import AppWebsocket from './modules/App'
import App from './App'
import Home from './modules/components/Home'
import HomePage from './HomePage'
import Sensor from './modules/components/Sensor'
import StaticSensor from './modules-api/Sensor'
import StaticHome from './modules-api/Home'

let store = createStore(
    sensorsApp,
    applyMiddleware(
        thunkMiddleware
    ));

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={HomePage}/>
                <Route path="/websocket" component={AppWebsocket}>
                    <Route path="/websocket/sensor">
                        <IndexRoute component={Home}/>
                        <Route path="/websocket/sensor/:id" component={Sensor}/>
                    </Route>
                </Route>
                <Route path="/static" component={StaticApp}>
                    <Route path="/static/sensor">
                        <IndexRoute component={StaticHome}/>
                        <Route path="/static/sensor/:id" component={StaticSensor}/>
                    </Route>
                </Route>
            </Route>
        </Router>
    </Provider>
), document.getElementById('root')
);