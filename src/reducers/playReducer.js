import { INIT_PLAYING_STATE, SET_MUSIC_URL } from './actionType'

const initialState = {
    title: '歌曲',
    picUrl: '',
    musicDetail: {},
    musicTime: 0,
    musicId: 0,
    musicUrl: ''
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
        default:
            return state
    }
}