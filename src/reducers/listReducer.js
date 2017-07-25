import { SET_LIST } from './actionType'
import utils from '../utils/ajax'

const initialState = {
    title: '音乐',
    listData: {}
}

export function getList(key, data) {
    return (dispatch, getState) => {
        let state = getState()
        if (!state.list.listData.playlist) {
            utils.post(key, data).then(res => {
                dispatch(setList(res))
            })
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
        default:
            return state
    }
}
