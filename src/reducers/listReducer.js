import { SET_LIST, SAVE_SCROLL_DIS, SET_PLAY_LIST } from './actionType'
import storage from '../utils/storage'
import { ajaxPost } from './ajax'

const initialState = {
    title: '音乐',
    listData: {},
    scrollDis: 0,
    playlist: [],
    loading: false
}

export function getList(key, data) {
    return (dispatch, getState) => {
        let state = getState()
        if (!state.list.listData.playlist) {
            // 判断本地存储里是否保存有数据
            let list = storage.read('list')
            if (list) {
                let obj = JSON.parse(list)
                dispatch(setList(obj))
                dispatch({
                    type: 'SET_PLAY_LIST',
                    playlist: obj.playlist.tracks
                })
            } else if (key && data) {
                state.list.loading = true
                dispatch(ajaxPost(key, data)).then(res => {
                    dispatch(setList(res))
                    dispatch({
                        type: 'SET_PLAY_LIST',
                        playlist: res.playlist.tracks
                    })
                    storage.save({
                        name: 'list',
                        data: JSON.stringify(res)
                    })
                    state.list.loading = false
                }).catch(res => {
                    state.list.loading = false
                    console.error(`列表数据获取失败${res}`)
                })
            }
        }
    }
}

export function setList(data) {
    return {
        type: SET_LIST,
        data
    }
}
export function list(state = initialState, action) {
    switch (action.type) {
        case SET_LIST:
            return Object.assign({}, state, {
                listData: action.data
            })
        case SAVE_SCROLL_DIS:
            return Object.assign({}, state, {
                scrollDis: action.dis
            })
        case SET_PLAY_LIST:
            return Object.assign({}, state, {
                playlist: action.playlist
            })
        default:
            return state
    }
}
