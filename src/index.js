import React from 'react'
import ReactDOM from 'react-dom'
import './common/js/rem'
import './common/style/reset.css'
import './common/style/app.css'
import './common/style/patch.css'
import App from 'container/app/AppContainer'
// import App from './components/app/App'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import reducers from 'reducers/app'
import Fastclick from 'fastclick'

Fastclick.attach(document.body)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()
const middlewareOfRouter = routerMiddleware(history)
const store = createStore(
    combineReducers({
        ...reducers,
        router: routerReducer
    }),
    composeEnhancers(
        applyMiddleware(thunkMiddleware,middlewareOfRouter)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)