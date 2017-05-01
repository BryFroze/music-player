import { createStore } from 'redux'
import { todoApp } from '../reducers/reducer'

const store = createStore(todoApp)

console.log(store.getState())