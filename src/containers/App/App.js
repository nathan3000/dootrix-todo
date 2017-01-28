import React, { Component } from 'react';
import './App.css';
import TodoList from 'components/TodoList/TodoList'
import AddTodo from 'components/AddTodo/AddTodo'

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
