import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './container/App';
import firstApp from './reducers/first-reducer'
// import './index.css';
let store = createStore(firstApp)

store.subscribe(() => console.log(store.getState()))
// console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
