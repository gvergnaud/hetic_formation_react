import React, { PropTypes } from 'react'

const TodoItem = ({
  text = 'Passer un `text` en props'
}) => <li>{text}</li>

TodoItem.propTypes = {
  text: PropTypes.string.isRequired
}


export default TodoItem
