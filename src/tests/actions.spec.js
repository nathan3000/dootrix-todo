import * as actions from '../actions'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import config from 'config'

const { TODO_API_HOST } = config

const middlewares = [ thunk ]
let store



describe('action creator', () => {
    beforeEach(() => {
        store = configureMockStore(middlewares)()
    })

    afterEach(() => {
        nock.cleanAll()
    })

    describe('addTodoLocal', () => {
        it('creates ADD_TODO_LOCAL action', () => {
            const todo = {
                id: 123123,
                text: 'Buy milk'
            }

            const addTodoLocal = actions.addTodoLocal(todo)

            store.dispatch(addTodoLocal)

            expect(store.getActions()).to.include(addTodoLocal)
        })
    })  

    describe('addTodo', () => {
        it('creates ADD_TODO_REQUEST and ADD_TODO_LOCAL actions', () => {
            const todo = {
                id: "123123",
                text: 'Buy milk',
                completed: false
            }

            const addTodo = actions.addTodo(todo)
            const addTodoLocal = actions.addTodoLocal(todo)
            const addTodoRequest = actions.addTodoRequest()

            const expectedActions = [ addTodoLocal, addTodoRequest ]

            store.dispatch(addTodo)

            expect(store.getActions()).to.eql(expectedActions)                
        })

        it('makes a POST request to api', () => {
            nock(TODO_API_HOST)
                .post('/api/todos')
                .reply(200, { body: { todos: [] }})

            const todo = {
                id: "123123",
                text: 'Buy milk'
            }

            const addTodo = actions.addTodo(todo)

            return store.dispatch(addTodo)
                .then(() => {
                    expect(nock.isDone()).to.eql(true)
                })
                .catch((error) => {
                    assert.isNotOk(error, 'Promise error');
                })      
        })

        it('creates ADD_TODO_API_SUCCESS action when POST request succeeds', () => {
            nock(TODO_API_HOST)
                .post('/api/todos')
                .reply(200, { body: { todos: [] }})

            const todo = {
                id: "123123",
                text: 'Buy milk'
            }

            const addTodo = actions.addTodo(todo)

            return store.dispatch(addTodo)
                .then(() => {
                    expect(store.getActions()).to.include(actions.addTodoAPISuccess())
                })
                .catch((error) => {
                    assert.isNotOk(error, 'Promise error');
                })     
        })

        it('creates ADD_TODO_API_FAILURE action when POST request fails', () => {
            nock(TODO_API_HOST)
                .post('/api/todos')
                .reply(500, "")

            const todo = {
                id: "123123",
                text: 'Buy milk'
            }

            const addTodo = actions.addTodo(todo)

            return store.dispatch(addTodo)
                .then(() => {
                    expect(store.getActions()).to.include(actions.addTodoAPIFailure())
                })
                .catch((error) => {
                    assert.isNotOk(error, 'Promise error');
                })     
        })
    })         

    describe('toggleTodo', () => {
        it('creates TOGGLE_TODO_REQUEST and TOGGLE_TODO_LOCAL actions', () => {
            const todo = {
                id: "123123",
                text: 'Buy milk',
                completed: false
            }

            store.dispatch(actions.addTodo(todo))

            const toggleTodoRequest = actions.toggleTodoRequest()
            const toggleTodoLocal = actions.toggleTodoLocal(todo.id)

            store.dispatch(actions.toggleTodo(todo.id, true))

            expect(store.getActions()).to.include(toggleTodoRequest)     
            expect(store.getActions()).to.include(toggleTodoLocal)                
        
        })

        it('makes a POST request to api', () => {
            nock(TODO_API_HOST)
                .put('/api/todos/123123')
                .reply(200, { body: { todos: [] }})

            return store.dispatch(actions.toggleTodo("123123", true))
                .then(() => {
                    expect(nock.isDone()).to.eql(true)
                })   
        })
    })
 
    describe('fetchTodos', () => {
        it('creates FETCH_TODOS_REQUEST action', () => {
            nock(TODO_API_HOST)
                .get('/api/todos')
                .reply(200, { body: { todos: [] }})

            const fetchTodosRequest = actions.fetchTodosRequest()
            const expectedActions = [ fetchTodosRequest ]

            store.dispatch(actions.fetchTodos())

            expectedActions.map((action) => {
                expect(store.getActions()).to.include(action)  
            })            
        })

        it('makes a GET request to api', () => {
            nock(TODO_API_HOST)
                .get('/api/todos')
                .reply(200, { body: { todos: [] }})

            return store.dispatch(actions.fetchTodos())
                .then(() => {
                    expect(nock.isDone()).to.eql(true)
                })
                .catch((error) => {
                    
                })     
        })

        it('creates FETCH_TODOS_SUCCESS action on success', () => {
            const json = [ { "id": "123123", "text": "Buy milk" }]
            nock(TODO_API_HOST)
                .get('/api/todos')
                .reply(200, { body: json  })

            const fetchTodosSuccess = actions.fetchTodosSuccess(json)
            const expectedActions = [ fetchTodosSuccess ]

            return store.dispatch(actions.fetchTodos())
                .then(() => {
                    expectedActions.map((action) => {
                        expect(store.getActions()).to.include(action)  
                    }) 
                })
                .catch((error) => {
                    
                }) 
        })
    })

    describe('login', () => {
        it('creates a LOGIN_REQUEST action', () => {
            const json = { "email": "test@example.com", "password": "password123" }
            nock(TODO_API_HOST)
                .post('/api/auth', json)
                .reply(200, { success: true })
            const loginRequest = actions.loginRequest()
            const expectedActions = [ loginRequest ]

            store.dispatch(actions.login(json))

            expectedActions.map((action) => {
                expect(store.getActions()).to.include(action)  
            })       
        })

        it('creates a LOGIN_SUCCESS action on success', () => {
            const json = { "email": "test@example.com", "password": "password123" }
            nock(TODO_API_HOST)
                .post('/api/auth', json)
                .reply(200, { success: true })

            const loginSuccess = actions.loginSuccess()
            const expectedActions = [ loginSuccess ]

            return store.dispatch(actions.login(json))
                .then(() => {
                    expectedActions.map((action) => {
                        expect(store.getActions()).to.include(action)  
                    }) 
                })    
        })

        it('creates a LOGIN_FAILURE action on failure', () => {
            const json = { "email": "test@example.com", "password": "password123" }
            nock(TODO_API_HOST)
                .post('/api/auth', json)
                .reply(401, {  })

            const loginFailure = actions.loginFailure()
            const expectedActions = [ loginFailure ]

            return store.dispatch(actions.login(json))
                .then(() => {
                    expectedActions.map((action) => {
                        expect(store.getActions()).to.include(action)  
                    }) 
                })    
        })
    })

})