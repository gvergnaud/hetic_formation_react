import React, { Component, PropTypes } from 'react';
import TodoList from './TodoList'
import Header from './Header'
import pick from './utils/pick'

export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todosById: {
        '1': {
          id: 1,
          text: 'salut'
        },

        '2': {
          id: 2,
          text: 'salut!'
        },

        '3': {
          id: 3,
          text: 'salut!!'
        }
      }
    };
  }

  _addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text
    };

    this.setState({
      todosById: {
        ...this.state.todosById,
        [newTodo.id]: newTodo
      }
    })
  }

  _deleteTodo(todoId) {
    const filteredTodos = pick(this.state.todosById, (value, key) => key != todoId)

    this.setState({
      todosById: filteredTodos
    });
  }

  _getTodoList() {
    return Object.keys(this.state.todosById).map(id => this.state.todosById[id])
  }

  render() {
    return (
      <div className="App">
        <Header addTodo={::this._addTodo} />
        <TodoList
          onDelete={::this._deleteTodo}
          todos={this._getTodoList()}
        />
      </div>
    );
  }
}
