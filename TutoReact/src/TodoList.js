import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'

const TodoList = ({todos, onDelete}) => (
  <ul className="TodoList">
    {todos.map(todo =>
      <TodoItem key={todo.id} onDelete={onDelete} {...todo} />
    )}
  </ul>
)

const { arrayOf, shape, number, string, func } = PropTypes

TodoList.propTypes = {
  todos: arrayOf(
    shape({
      id: number.isRequired,
      text: string.isRequired,
    })
  ).isRequired,
  onDelete: func.isRequired
}

export default TodoList
