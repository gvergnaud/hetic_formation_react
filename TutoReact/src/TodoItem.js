import React, { PropTypes } from 'react'

const TodoItem = ({text}) => <li>{text}</li>

TodoItem.propTypes = {
  text: PropTypes.string.isRequired
}

TodoItem.defaultProps = {
  text: 'Passer un `text`en props'
}

export default TodoItem
