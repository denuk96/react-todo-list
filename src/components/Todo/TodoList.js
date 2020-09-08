import React, {useState, useEffect} from "react";
import Context from "../../context";
import {connect} from 'react-redux';
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {
  getTodosActionAsync,
  toggleTodoActionAsync,
  updateTodoActionAsync,
  deleteTodoActionAsync,
  addTodoActionAsync,
  ToggleFormTodoActionAsync,
  ShowTodosLoader} from "./store/functions";
import {Loader} from "../Loader/loader";

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

    useEffect(
      () => {
        if (props.todos.length === 0) {
          props.showLoader()
          props.getTodos()
        }
      }, [],
    );

    function addTodos(title) {
      props.showLoader()
      props.addTodos(title)
      hideForm()
    }

    function toggleTodos(todo) {
      props.toggleTodo(todo)
    }

    function updateTodo(id, title) {
      props.showLoader()
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

    if (props.loader === true) {
      return (<Loader />)
    }

    return(
      <Context.Provider value={{deleteTodo, updateTodo}} >
        <div>
          <h1>My ToDo list</h1>
          <ul style={styles.ul}>
            {
              props.todos.map((todo,index) => {
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
    todos: state.todoReducer.todos,
    loader: state.todoReducer.todosLoader
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: () => dispatch(getTodosActionAsync()),
    addTodos: (params) => dispatch(addTodoActionAsync(params)),
    deleteTodos: (id) => dispatch(deleteTodoActionAsync(id)),
    updateTodo: (id, title) => dispatch(updateTodoActionAsync(id, title)),
    toggleForm: (id) => dispatch(ToggleFormTodoActionAsync(id)),
    toggleTodo: (todo) => dispatch(toggleTodoActionAsync(todo)),
    showLoader: () => dispatch(ShowTodosLoader())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);