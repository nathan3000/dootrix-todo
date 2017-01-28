import React, { Component } from 'react'
import { connect } from 'react-redux'
import TodoItem from 'components/TodoItem/TodoItem'
import './TodoList.css'

import * as todoActions from '../../actions'

class TodoList extends Component {
	componentDidMount() {
		this.props.fetchTodos()
	}

	render() {
		const { todos, markComplete } = this.props
		return (
			<div className="todo-list">
				<h1>Todos</h1>
				{ todos.length > 0 
					? <ul>
						{ todos.map((todo) => <TodoItem key={ todo.id } todo={ todo } onClick={ markComplete } /> )}
					</ul>
					: ""			
				}		
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		todos: state.todos
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		markComplete: (id, completed) => {
			dispatch(todoActions.toggleTodo(id, completed))
		},
		fetchTodos: () => {
			dispatch(todoActions.fetchTodos())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)