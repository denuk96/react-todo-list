import React, { useRef } from 'react';

export default function TodoForm({addTodos, updateTodo, newTodo, hideFormAfterSave, todoItemId}) {
  const todoForm = useRef(null)

  function submitTodo(e) {
    e.preventDefault();
    const todoText = todoForm.current['todoText'].value
    if (newTodo) {
      addTodos(todoText)
    } else {
      updateTodo(todoItemId, todoText)
      hideFormAfterSave()
    }
  }

  return (
    <form onSubmit={submitTodo.bind(null)} ref={todoForm} >
      <label>
        {
          newTodo
          ? 'New TODO'
          : 'Update todo'
        }
        <input type="text" name={'todoText'} />
      </label>
      <input type="submit" value="Save" className='btn btn-info' />
    </form>
  );
}