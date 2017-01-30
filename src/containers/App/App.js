import React, { Component } from 'react';
import './App.css';
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import TodoList from '../TodoList/TodoList'
import AddTodo from '../AddTodo/AddTodo'

class App extends Component {
  render() {
    return (
      <div className="app"> 
          <Header />
          <main className="app-main"> 
            { this.props.children }   
          </main>          
          <Footer />
      </div>
    );
  }
}

export default App;
