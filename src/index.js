import React from 'react'
import ReactDOM from 'react-dom'
import './common/js/rem'
import './common/style/reset.css'
import './common/style/app.css'
import './common/style/patch.css'
import App from './components/app/App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import player from './reducers/appReducer'
import Fastclick from 'fastclick'

Fastclick.attach(document.body)

const store = createStore(
    player,
    applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)