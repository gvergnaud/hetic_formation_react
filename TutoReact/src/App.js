import React, { Component, PropTypes } from 'react';
import TodoList from './TodoList'
import Header from './Header'

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
        },
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
    const filteredTodos = Object.keys(this.state.todosById).reduce((filteredTodos, id) => {
      if (id !== todoId) filteredTodos[id] = this.state.todosById[id];
      return filteredTodos;
    }, {});

    this.setState({
      todosById: filteredTodos
    });
  }

  render() {

    const todos = Object.keys(this.state.todosById).map(id => this.state.todosById[id]);

    return (
      <div className="App">
        <Header addTodo={::this._addTodo} />
        <TodoList
          onDelete={::this._deleteTodo}
          todos={todos}
        />
      </div>
    );
  }
}
