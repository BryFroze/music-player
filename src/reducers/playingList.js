import { SET_PLAYING_LIST } from './actionType'
import storage from '../utils/storage'

let list = JSON.parse(storage.read('playingList')) || []

const initialState = {
    list: list,
    listId: 0
}

export function playingList(state = initialState, action) {
    switch(action.type) {
        case SET_PLAYING_LIST:
            if (action.data.listId != state.listId) {
                return setList(action, state)
            } else {
                return state
            }
        default:
            return state
    }
}

function setList(action, state) {
    storage.save({
        name: 'playingList',
        data: JSON.stringify(action.data.list)
    })
    return Object.assign({}, state, {
        list: action.data.list,
        listId: action.data.listId
    })
}