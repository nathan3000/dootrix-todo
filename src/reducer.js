import * as t from './actions'

export const initialState = {
    todos: [],
    showAddTodoForm: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.ADD_TODO_LOCAL:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    action.todo
                ]
            })
        case t.TOGGLE_TODO_LOCAL:
            return Object.assign({} , state, {
                todos: state.todos.map((todo) => {
                    if (todo.id === action.id) {
                        return Object.assign({}, todo, {
                                completed: !todo.completed
                            })
                    } 
                    return todo
                })
            })
        case t.TOGGLE_ADD_TODO_FORM:
            return Object.assign({}, state, {
                showAddTodoForm: action.value
            })
        case t.FETCH_TODOS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case t.FETCH_TODOS_SUCCESS:
            return Object.assign({}, state, {
                todos: action.json.map((todoJson) => {
                            return {
                                id: todoJson.id,
                                text: todoJson.text,
                                completed: todoJson.completed
                            }
                }),
                isFetching: false
            })
        default:
            return state
    }
}

export default reducer