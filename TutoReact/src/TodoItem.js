import React, { PropTypes } from 'react'

const TodoItem = ({
  id,
  text = 'Passer un `text` en props',
  onDelete
}) => (
  <li>
    {text}
    <span onClick={() => onDelete(id)}> &times;</span>
  </li>
)

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired
}


export default TodoItem
