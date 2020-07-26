import React, { useContext } from "react";
import PropTypes from 'prop-types'
import Context from "../context";

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em 0.5em',
    border: '1px solid',
    borderRadius: '5px',
    marginTop: '3px'
  }
}

function TodoItem({todo, index, onChange}) {
  let { deleteTodo } = useContext(Context)
  let classes = []

  if (todo.completed === true) {
    classes.push('todo-done')
  }

  return(
    <li style={styles.li}>
          <span className={classes.join(' ')}>
            <input type="checkbox" onChange={() => onChange(todo.id)} checked={ todo.completed } />
            <strong>{index + 1}</strong>
            &nbsp;
            {todo.title}
          </span>
      <button onClick={deleteTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TodoItem