import { combineReducers } from 'redux'
import { FIRST_EVENT } from '../actions/action'

function test(state='default', action) {
    switch (action.type) {
        case FIRST_EVENT:
            console.log('redux成功触发')
            return 'im first event from redux'
        default:
            return state
    }
}

const firstApp = combineReducers({
    test
})

export default firstApp