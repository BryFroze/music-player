import { combineReducers } from 'redux'
import { list } from './listReducer'
import { audio } from './audioReducer'
import { playStatus } from './playReducer'

const player = combineReducers({
    list,
    audio,
    playStatus
})

export default player