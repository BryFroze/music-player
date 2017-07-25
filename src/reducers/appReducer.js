import { combineReducers } from 'redux'
import { list } from './listReducer'

const player = combineReducers({
    list
})

export default player