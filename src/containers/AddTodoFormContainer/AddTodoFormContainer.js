import React, { Component } from 'react'
import * as utils from 'lib/utils'
import AddTodoForm from 'components/AddTodoForm/AddTodoForm'

class AddTodoFormContainer extends Component {
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
            <AddTodoForm 
                inputRef={ (input) => { this.todoText = input } } 
                handleSubmit={ this.handleSubmit.bind(this) } />
        )
    }
}

export default AddTodoFormContainer
