import React, {useState} from "react";
import Context from "../context";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { connect } from 'react-redux';
import {addTodoAction, toggleTodoAction, updateTodoAction, deleteTodoAction, addTodoActionAsync} from "./store/types";

const styles = {
    ul: {
        listStyle: 'none'
    },
    inline: {
        display: 'inline-block'
    }

}

function TodoList(props) {
    console.log(props)
    console.log(props.todos.todoReducer.length)
    // const todosStore = window.store
    console.log('todoList rendered')

    // const [loaded, setLoad] = useState(false)
    const [todos, setTodos] = useState([])
    // const [todos, setTodos] = useState([...todosStore.getState()])
    const [formShowed, setForm] = useState(false)
    const [formTodoId, setTodoFormId] = useState(null)

    // todosStore.subscribe(() => reactOnChanges())

    function reactOnChanges() {
      // setTodos([...todosStore.getState()])
      hideForm()
    }


    // useEffect(() => {
    //   const fetchData = async () => {
    //       async function loadTodos() {
    //         return TodoApi.getAll();
    //       }
    //
    //       loadTodos().then((result) => {
    //
    //         setTodos([...result])
    //         setLoad(true)
    //       })
    //     }
    //   fetchData();
    //   }, []
    // )

    function addTodos(title) {
      props.addTodos(title)
      // todosStore.dispatch(addTodoActionAsync(title))
    }

    function toggleTodos(id) {
      // todosStore.dispatch(toggleTodoAction(id))
    }

    function updateTodo(id, title) {
      // todosStore.dispatch(updateTodoAction(id, title))
    }

    function deleteTodo(id) {
      props.deleteTodos(id)
      // todosStore.dispatch(deleteTodoAction(id))
    }

    function showTodoUpdateForm(id) {
      setTodos(
        todos.map(todo => {
          if (id === todo.id) {
            todo.showForm = !todo.showForm
          } else {
            todo.showForm = false
          }
          return todo
        })
      )
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
                                 onChange={toggleTodos}/>
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
    addTodos: (params) => dispatch(addTodoActionAsync(params)),
    deleteTodos: (id) => dispatch(deleteTodoAction(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
// export default TodoList