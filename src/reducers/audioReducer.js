import { SET_AUDIO } from './actionType'

const initialState = {
    myAudio: null
}

export function audio(state = initialState, action) {
    switch(action.type) {
        case SET_AUDIO:
            return Object.assign({}, state, {
                myAudio: action.audio
            })
        default:
            return state
    }

}