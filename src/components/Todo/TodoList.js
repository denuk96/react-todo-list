import React, {useState, useEffect} from "react";
import Context from "../../context";
import {connect, useSelector} from "react-redux";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {
  tryGetTodosAction,
  tryAddTodoAction,
  tryToggleTodoAction,
  tryUpdateTodoAction,
  tryDeleteTodoAction,
  ToggleFormTodoAction,
} from "../../ducks/todo";
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
    const signedIn = useSelector(state => state.authReducer.signedIn)
    const [formShowed, setForm] = useState(false)

    useEffect(
      () => {
        if (props.todos.length === 0) {
          props.getTodos()
        }
      }, [],
    );

    function addTodos(title) {
      props.addTodos(title)
      hideForm()
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

    if (props.loader === true) {
      return (<Loader />)
    }

    if (!signedIn) {
      return (
        <h5>Log in first to get your own todo list</h5>
      )
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
                  <TodoForm addTodos={addTodos} newTodo={true}/>
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
    getTodos: () => dispatch(tryGetTodosAction()),
    addTodos: (params) => dispatch(tryAddTodoAction(params)),
    deleteTodos: (id) => dispatch(tryDeleteTodoAction(id)),
    updateTodo: (id, title) => dispatch(tryUpdateTodoAction(id, title)),
    toggleForm: (id) => dispatch(ToggleFormTodoAction(id)),
    toggleTodo: (todo) => dispatch(tryToggleTodoAction(todo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);