import reducer, { initialState } from '../reducer'
import * as actions from '../actions'
import { expect } from 'chai'
import sinon from 'sinon'
import * as utils from '../lib/utils'

describe('todo reducer', () => {
    it('should return initial state', () => {
        const newState = reducer(undefined, {})
        expect(newState).to.eql(initialState)
    })

    it('should return initial state with empty todo list', () => {
        const newState = reducer(undefined, {})
        expect(newState).has.property('todos')
        expect(newState.todos).to.be.a('array')
    })

    it('should initially have add todo form hidden', () => {
        const newState = reducer(undefined, {})
        expect(newState.showAddTodoForm).to.equal(false)
    })

    describe('ADD_TODO_LOCAL', () => {
        it('should add todo to todos list', () => {
            const todo = {
                id: 123123,
                text: 'Buy milk',
                completed: false
            }
            const newState = reducer(undefined, actions.addTodoLocal(todo))
            expect(newState.todos[0].id).to.equal(todo.id)
            expect(newState.todos[0].text).to.equal(todo.text)
            expect(newState.todos[0].completed).to.equal(false)
        })
    })

    describe('TOGGLE_TODO_LOCAL', () => {
        it('should toggle todo locally as complete', () => {
            const todo = {
                id: 1,
                text: 'Buy milk',
                completed: false
            }
            let state = reducer(undefined, actions.addTodoLocal(todo))
            expect(state.todos[0].completed).to.equal(false)
            state = reducer(state, actions.toggleTodoLocal(1))
            expect(state.todos[0].completed).to.equal(true)
        })
    })

    describe('TOGGLE_ADD_TODO_FORM', () => {
        it('should toggle add todo form', () => {
            const newState = reducer(undefined, actions.toggleAddTodoForm(true))
            expect(newState.showAddTodoForm).to.equal(true)
        })
    })

    describe('FETCH_TODOS_REQUEST', () => {
        it('should toggle fetching flag', () => {
            // const json = [ { "id": "123123", "text": "Buy milk", "completed": false }]
            const newState = reducer(undefined, actions.fetchTodosRequest())
            expect(newState.isFetching).to.equal(true)
        })
    })
    
    describe('FETCH_TODOS_SUCCESS', () => {
        it('should load up state with todos', () => {
            const json = [ { "id": "123123", "text": "Buy milk", "completed": false }]
            const newState = reducer(undefined, actions.fetchTodosSuccess(json))
            expect(newState.todos.length).to.equal(1)
            expect(newState.todos.id).to.equal(json[0].id)
            expect(newState.todos.text).to.equal(json[0].text)
            expect(newState.todos.completed).to.equal(json[0].completed)
            expect(newState.isFetching).to.equal(false)
        })
    })


})