// import { combineReducers } from 'redux'
import { list } from './listReducer'
import { audio } from './audioReducer'
import { playStatus } from './playReducer'
import { ajaxStatus } from './ajax'
import { songList } from './songList'

const player = {
    list,
    audio,
    playStatus,
    ajaxStatus,
    songList
}

export default player