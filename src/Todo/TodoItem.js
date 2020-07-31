import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import Context from "../context";
import TodoForm from "./TodoForm";
import TodoApi from "./api/api";

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

function TodoItem({todo, index, showTodoUpdateForm, onChange}) {
  const { deleteTodo, updateTodo } = useContext(Context)
  const classes = []


  if (todo.completed === true) {
    classes.push('todo-done')
  }

  function toggleForm() {
    showTodoUpdateForm(todo.id)
  }

  function hideFormAfterSave() {
    toggleForm()
  }

  return(
    <li>
      <div style={styles.li}>
        <span className={classes.join(' ')}>
            <input type="checkbox" onChange={() => onChange(todo.id)} checked={ todo.completed } />
            <strong>{index + 1}</strong>
          &nbsp;
          {todo.title}
      </span>
        <div className='todo_buttons'>
          <button onClick={toggleForm}>
            edit
          </button>
          <button onClick={deleteTodo.bind(null, todo.id)}>
            &times;
          </button>
        </div>
      </div>

      { todo.showForm === true &&
        <div>
          <TodoForm updateTodo={updateTodo} new={false} todoItemId={todo.id} hideFormAfterSave={hideFormAfterSave}/>
        </div>
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