import { INIT_PLAYING_STATE, SET_MUSIC_URL, UPDATE_PLAY_NUMBER, CHANGE_PLAY_STATUS } from './actionType'
import storage from '../utils/storage'

const initialState = {
    title: '歌曲',
    picUrl: '',
    musicDetail: {},
    musicTime: 0,
    musicId: 0,
    musicUrl: '',
    playNumber: 0,
    isPlay: true
}

export function playStatus(state = initialState, action) {
    switch(action.type) {
        case INIT_PLAYING_STATE:
            return Object.assign({}, state, {
                ...action.data
            })
        case SET_MUSIC_URL:
            return Object.assign({}, state, {
                musicUrl: action.url
            })
        case UPDATE_PLAY_NUMBER:
            storage.save({
                name: 'playNumber',
                data: action.number
            })
            return Object.assign({}, state, {
                playNumber: action.number
            })
        case CHANGE_PLAY_STATUS:
            return Object.assign({}, state, {
                isPlay: !state.isPlay
            })
        default:
            return state
    }
}
