
import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/action'

const initialState = {
	VisibilityFilter: VisibilityFilters.SHOW_ALL,
	todos: []
}

function VisibilityFilter(state, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                VisibilityFilter: action.filter
            })
        default:
            return state
    }
}
function todos(state, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos:[
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
    }
}

const todoApp = combineReducers({
    VisibilityFilter,
    todos
})