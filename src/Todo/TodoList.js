import React, { useEffect, useState } from "react";
import Context from "../context";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import {addTodo, deleteTodos, toggleTodo, updateTodos} from "./store/types";

const styles = {
    ul: {
        listStyle: 'none'
    },
    inline: {
        display: 'inline-block'
    }

}

function TodoList() {
    const todosStore = window.store

    // const [loaded, setLoad] = useState(false)
    const [todos, setTodos] = useState([...todosStore.getState()])
    const [formShowed, setForm] = useState(false)
    const [formTodoId, setTodoFormId] = useState(null)

    todosStore.subscribe(() => reactOnChanges())

    function reactOnChanges() {
      setTodos([...todosStore.getState()])
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

    async function addTodos(params) {
      todosStore.dispatch({type: addTodo}, params)
    }

    function toggleTodos(id) {
      todosStore.dispatch({type: toggleTodo}, id)
    }

    function updateTodo(id, title) {
      todosStore.dispatch({type: updateTodos}, {id: id, title: title})
    }

    function deleteTodo(id) {
      todosStore.dispatch({type: deleteTodos}, {id: id})
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
              todos.map((todo,index) => {
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

export default TodoList