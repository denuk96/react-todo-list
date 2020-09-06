import React, {useState, useEffect} from "react";
import Context from "../context";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { connect } from 'react-redux';
import {getTodosActionAsync, toggleTodoActionAsync, updateTodoActionAsync, deleteTodoActionAsync, addTodoActionAsync, ToggleFormTodoActionAsync} from "./store/functions";

const styles = {
    ul: {
        listStyle: 'none'
    },
    inline: {
        display: 'inline-block'
    }
}

function TodoList(props) {
    console.log('todoList rendered')

    const [formShowed, setForm] = useState(false)
    const [formTodoId, setTodoFormId] = useState(null)

  useEffect(
    () => {
      if (props.todos.todoReducer.length === 0) {
        console.log('useEffect')
        props.getTodos()
      }

    }, [],
  );

    function reactOnChanges() {
      hideForm()
    }

    function addTodos(title) {
      props.addTodos(title)
    }

    function toggleTodos(todo) {
      props.toggleTodo(todo)
    }

    function updateTodo(id, title) {
      props.updateTodo(id, title)
    }

    function deleteTodo(id) {
      props.deleteTodos(id)
    }

    function showTodoUpdateForm(id) {
      props.toggleForm(id)
    }

    function showForm() {
      setForm(true)
    }

    function hideForm() {
      setForm(false)
    }

    return(
      <Context.Provider value={{deleteTodo, updateTodo}} >
        <div>
          <h1>My ToDo list</h1>
            {/*{ loaded === false &&*/}
            {/*  <h2>*/}
            {/*     Loading...*/}
            {/*  </h2>*/}
            {/*}*/}
          <ul style={styles.ul}>
            {
              props.todos.todoReducer.map((todo,index) => {
                return <TodoItem todo={todo}
                                 key={todo.id}
                                 index={index}
                                 showTodoUpdateForm={showTodoUpdateForm}
                                 toggleTodos={toggleTodos}/>
              })
            }
          </ul>
          {formShowed
            ? <div style={styles.inline} >
                <div style={styles.inline} >
                  <TodoForm addTodos={addTodos} new={true}/>
                </div>
                <div style={styles.inline} >
                  <button className='btn btn-primary' onClick={hideForm.bind(null)}>Close</button>
                </div>
              </div>
            : <button className='btn btn-primary' onClick={ showForm.bind(null) }>Add todo</button>
          }
        </div>
      </Context.Provider>
    )
}

const mapStateToProps = (state) => {
  return {
    todos: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getTodosActionAsync()),
    addTodos: (params) => dispatch(addTodoActionAsync(params)),
    deleteTodos: (id) => dispatch(deleteTodoActionAsync(id)),
    updateTodo: (id, title) => dispatch(updateTodoActionAsync(id, title)),
    toggleForm: (id) => dispatch(ToggleFormTodoActionAsync(id)),
    toggleTodo: (todo) => dispatch(toggleTodoActionAsync(todo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);