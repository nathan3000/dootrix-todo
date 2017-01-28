import React, { Component } from 'react'
import classnames from 'classnames'
import './TodoItem.css'

const TodoItem = ({ todo, onClick }) => (
	<li className={ classnames("todo-item", { "completed" : todo.completed })} onClick={() => onClick(todo.id, !todo.completed) } >
		{ todo.text }
	</li>
)

export default TodoItem