import { combineReducers } from 'redux'
import { list } from './listReducer'
import { audio } from './audioReducer'
import { playStatus } from './playReducer'
import { ajaxStatus } from './ajax'

const player = combineReducers({
    list,
    audio,
    playStatus,
    ajaxStatus
})

export default player