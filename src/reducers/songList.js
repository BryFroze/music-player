import { GET_SONG_LIST } from './actionType'
import storage from '../utils/storage'
import { ajaxPost } from './ajax'

const initialState = {
    listData: []
}

export function getSongList() {
    return (dispatch, getState) => {
        let state = getState()
        if (!state.songList.listData.length) {
            let cacheList = storage.read('songList')
            if (!cacheList) {
                dispatch(ajaxPost('/top/playlist/highquality', 'cat=欧美&limit=30')).then(res => {
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

