import React, { Component } from 'react';
import './App.css';
import TodoList from '../TodoList/TodoList'
import AddTodo from '../AddTodo/AddTodo'

class App extends Component {
  render() {
    return (
      <div className="app">
          <TodoList />
          <AddTodo />      
      </div>
    );
  }
}

export default App;
