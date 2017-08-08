import { AJAX_POST} from './actionType'
import ajax from '../utils/ajax'

const ajaxState = {
    isLoading: false
}

export function ajaxPost(key, data){
    return (dispatch) => {
        dispatch({
            type: AJAX_POST
        })
        return new Promise((resolve, reject) => {
            ajax.post(key, data).then(res => {
                dispatch({
                    type: AJAX_POST
                })
                resolve(res)
            })
        })
    }
}

export function ajaxStatus(state = ajaxState, action) {
    switch(action.type) {
        case AJAX_POST:
            return Object.assign({}, state, {
                isLoading: !state.isLoading
            })
        default:
            return state
    }
}