// import { combineReducers } from 'redux'
import { list } from './list'
import { audio } from './audio'
import { playStatus } from './playStatus'
import { ajaxStatus } from './ajax'
import { songList } from './songList'
import { playingList } from './playingList'

const player = {
    list,
    audio,
    playStatus,
    ajaxStatus,
    songList,
    playingList
}

export default player