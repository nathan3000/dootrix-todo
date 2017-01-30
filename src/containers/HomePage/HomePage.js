import React, { Component } from 'react'
import TodoList from 'containers/TodoList/TodoList'
import AddTodo from 'containers/AddTodo/AddTodo'

class HomePage extends Component {
    render() {
        return (
            <div className="home"> 
                <TodoList />
                <AddTodo />  
            </div> 
        )
    }
}

export default HomePage