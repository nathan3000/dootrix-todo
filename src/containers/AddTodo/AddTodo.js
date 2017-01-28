import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import * as actions from '../../actions'
import * as utils from 'lib/utils'
import './AddTodo.css'
import AddTodoFormContainer from 'containers/AddTodoFormContainer/AddTodoFormContainer'

const AddTodo = ({ showAddTodoForm, toggleAddTodoForm, addTodo }) => {
    return (
        <div className={ classNames("add-todo", { "active": showAddTodoForm }) }>
            { showAddTodoForm
                ? <AddTodoFormContainer addTodo={ addTodo } />
                : <button onClick={() => toggleAddTodoForm() } className="button add-todo__button toggle">Add a to-do</button>
            }    
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showAddTodoForm: state.showAddTodoForm
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAddTodoForm: (inputRef) => {
            dispatch(actions.toggleAddTodoForm(true))
        },
        addTodo: (todoText) => {
            dispatch(actions.addTodo(todoText))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)

