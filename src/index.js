import React from 'react'
import ReactDOM from 'react-dom'
import './common/js/rem'
import './common/style/reset.css'
import './common/style/app.css'
import './common/style/patch.css'
import App from './container/AppContainer'
// import App from './components/app/App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import player from './reducers/appReducer'
import Fastclick from 'fastclick'

Fastclick.attach(document.body)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    player,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)