import React, { Component, PropTypes } from 'react';

class Header extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  _handleKeyUp(e) {
    if (e.which === 13) {
      this.props.addTodo(this.refs.text.value);
      this.refs.text.value = '';
    }
  }

  render() {
    return (
      <div className="Header">
        <input
          ref="text"
          placeholder="un todo"
          onKeyUp={::this._handleKeyUp}
        />
      </div>
    )
  }
}

export default Header;
