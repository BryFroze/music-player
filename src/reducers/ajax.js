import { LOADING_SWITCH, COUNT_POST_NUMBER } from './actionType'
import ajax from '../utils/ajax'

const ajaxState = {
    isLoading: false,
    postCount: 0
}

export function ajaxPost(key, data){
    return (dispatch, getState) => {
        let state = getState()
        dispatch({
            type: LOADING_SWITCH,
            loading: true
        })
        dispatch({
            type: COUNT_POST_NUMBER,
            cal: 1
        })
        return new Promise((resolve, reject) => {
            ajax.post(key, data).then(res => {
                dispatch({
                    type: COUNT_POST_NUMBER,
                    cal: -1
                })
                if (!state.ajaxStatus.postCount) {
                    dispatch({
                        type: LOADING_SWITCH,
                        loading: false
                    })
                }
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    }
}

export function ajaxStatus(state = ajaxState, action) {
    switch(action.type) {
        case LOADING_SWITCH:
            return Object.assign({}, state, {
                isLoading: action.loading
            })
        case COUNT_POST_NUMBER:
            return Object.assign({}, state, {
                postCount: state.postCount+action.cal
            })
        default:
            return state
    }
}