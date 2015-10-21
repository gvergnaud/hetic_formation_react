import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';

const { arrayOf, shape, number, string } = PropTypes;

const TodoList = ({todos}) => (
  <ul className="TodoList">
    {todos.map(todo =>
      <TodoItem key={todo.id} {...todo} />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: arrayOf(
    shape({
      id: number.isRequired,
      text: string.isRequired,
    })
  ).isRequired
}

export default TodoList;
