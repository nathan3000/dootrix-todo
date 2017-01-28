import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import * as actions from '../../actions'
import * as utils from '../../lib/utils'
import './AddTodo.css'

const AddTodo = ({ showAddTodoForm, toggleAddTodoForm, addTodo }) => {
    let todoText
    return (
        <div className={ classNames("add-todo", { "active": showAddTodoForm }) }>
            { showAddTodoForm
                ? <form onSubmit={(e) => {
                        e.preventDefault()
                        if (!todoText.value.trim()) {
                            return
                        }
                        addTodo({
                            id: utils.generateID(),
                            text: todoText.value
                        })
                        todoText.value = ''
                    } }> 
                    <input ref={(input) => { todoText = input; }} className="add-todo__input" placeholder='What do you need to get done?' />
                    <button type="submit" className="add-todo__button submit">Add a to-do</button>
                    </form>
                : <button onClick={() => toggleAddTodoForm() } className="add-todo__button toggle">Add a to-do</button>
            }    
        </div>
    )
}

// <a onClick={ (e) => showAddTodoInput() } href="#"><i className="plus icon"></i> Add Todo</a>

const mapStateToProps = (state) => {
    return {
        showAddTodoForm: state.showAddTodoForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddTodoForm: () => {
            dispatch(actions.toggleAddTodoForm(true))
        },
        addTodo: (todoText) => {
            dispatch(actions.addTodo(todoText))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)

