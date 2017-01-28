import fetch from 'isomorphic-fetch'
import config from 'config'

const { TODO_API_HOST, API_ENDPOINT, TODOS_ENDPOINT } = config

const API = `${TODO_API_HOST}${API_ENDPOINT}`
const TODOS_URL = `${API}${TODOS_ENDPOINT}`


export function addTodo(todo) {
    return function(dispatch) {
        const todoItem = Object.assign({}, todo, {
            completed: false
        })

        dispatch(addTodoLocal(todoItem))
        dispatch(addTodoRequest())

        return fetch(TODOS_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(todoItem)
                })
                .then(response => response.json())
                .then(json => dispatch(addTodoAPISuccess()))
                .catch(ex => dispatch(addTodoAPIFailure()))
    }
}

export const ADD_TODO_API_SUCCESS = 'ADD_TODO_API_SUCCESS'

export function addTodoAPISuccess() {
    return {
        type: ADD_TODO_API_SUCCESS
    }
}

export const ADD_TODO_API_FAILURE = 'APP_TODO_API_FAILURE'

export function addTodoAPIFailure() {
    return {
        type: ADD_TODO_API_FAILURE
    }
}

export const ADD_TODO_LOCAL = 'ADD_TODO_LOCAL'

export function addTodoLocal(todo) {
    return {
        type: ADD_TODO_LOCAL,
        todo
    }
}

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'

export function addTodoRequest() {
    return {
        type: ADD_TODO_REQUEST
    }
}

export const TOGGLE_TODO_LOCAL = 'TOGGLE_TODO_LOCAL'

export function toggleTodoLocal(id) {
    return {
        type: TOGGLE_TODO_LOCAL,
        id
    }
}

export const TOGGLE_TODO_REQUEST = 'TOGGLE_TODO_REQUEST'

export function toggleTodoRequest() {
    return {
        type: TOGGLE_TODO_REQUEST
    }
}

export function toggleTodo(id, completed) {
    return function (dispatch) {
        dispatch(toggleTodoLocal(id))
        dispatch(toggleTodoRequest())

        return fetch(`${TODOS_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: completed
                })
            })
            .then(response => response.json())
            // .then(json => dispatch(addTodoAPISuccess()))
            // .catch(ex => dispatch(addTodoAPIFailure()))


    }
}

export const TOGGLE_ADD_TODO_FORM = 'TOGGLE_ADD_TODO_FORM'

export function toggleAddTodoForm(value) {
    return {
        type: TOGGLE_ADD_TODO_FORM,
        value
    }
}

export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST'

export function fetchTodosRequest() {
    return {
        type: FETCH_TODOS_REQUEST
    }
}

export function fetchTodos() {
    return function (dispatch) {
        dispatch(fetchTodosRequest())

        return fetch(TODOS_URL)
                .then(response => response.json())
                .then(json => dispatch(fetchTodosSuccess(json)))
                // .catch(err => console.log(err))
    }
}

export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'

export function fetchTodosSuccess(json) {
    return {
        type: FETCH_TODOS_SUCCESS,
        json
    }
}