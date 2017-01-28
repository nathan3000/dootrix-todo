import React, { Component } from 'react'
import * as utils from '../../lib/utils'
import './AddTodoForm.css'

class AddTodoForm extends Component {
    constructor(props) {
        super(props)
        let todoText
    }

    componentDidMount() {
        this.todoText.focus()
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.todoText.value.trim()) {
            return
        }

        this.props.addTodo({
            id: utils.generateID(),
            text: this.todoText.value
        })

        this.todoText.value = ''
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit.bind(this) } className="add-todo-form"> 
                    <input ref={(input) => { this.todoText = input; }} className="add-todo-form__input" placeholder='What do you need to get done?' />
                    <button type="submit" className="button add-todo-form__button submit">Add a to-do</button>
            </form>
        )
    }
}

export default AddTodoForm