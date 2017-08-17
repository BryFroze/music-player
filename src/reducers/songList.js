import { GET_SONG_LIST } from './actionType'
import ajax from '../utils/ajax'
import storage from '../utils/storage'

const initialState = {
    listData: []
}

export function getSongList() {
    return (dispatch, getState) => {
        let state = getState()
        if (!state.songList.listData.length) {
            let cacheList = storage.read('songList')
            if (!cacheList) {
                ajax.post('/top/playlist/highquality', 'cat=欧美&limit=30').then(res => {
                    console.log(res)
                    let list = res.playlists
                    let listStr = JSON.stringify(list)
                    dispatch({
                        type: GET_SONG_LIST,
                        data: list
                    })
                    storage.save({
                        name: 'songList',
                        data: listStr
                    })
                })
            } else {
                dispatch({
                    type: GET_SONG_LIST,
                    data: JSON.parse(cacheList)
                })
            }
        }
    }
}

export function songList(state = initialState, action) {
    switch (action.type) {
        case GET_SONG_LIST:
            return Object.assign({}, state, {
                listData: action.data
            })
        default:
            return state
    }
}

