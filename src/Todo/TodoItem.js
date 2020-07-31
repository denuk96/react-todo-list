import React, {useContext, useState} from "react";
import PropTypes from 'prop-types'
import Context from "../context";
import TodoForm from "./TodoForm";

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
  const [showedForm, setForm] = useState(false)
  let { deleteTodo, updateTodo } = useContext(Context)
  let classes = []

  if (todo.completed === true) {
    classes.push('todo-done')
  }

  function toggleForm() {
    setForm(!showedForm)
  }

  return(
    <li style={styles.li}>
          <span className={classes.join(' ')}>
            <input type="checkbox" onChange={() => onChange(todo.id)} checked={ todo.completed } />
            <strong>{index + 1}</strong>
            &nbsp;
            {todo.title}
          </span>


      <button onClick={toggleForm}>
        edit
      </button>
      <button onClick={deleteTodo.bind(null, todo.id)}>
        &times;
      </button>
      {showedForm
        ? <TodoForm updateTodo={updateTodo} new={false} todoItemId={todo.id}/>
        : ''
      }
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TodoItem