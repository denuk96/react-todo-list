import React, { useEffect, useState } from "react";
import Context from "../context";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ToDoItemModel from "./ToDoItemModel";
import TodoApi from "./api/api";

const styles = {
    ul: {
        listStyle: 'none'
    },
    inline: {
        display: 'inline-block'
    }

}

function TodoList() {
    const [loaded, setLoad] = useState(false)
    const [todos, setTodos] = useState([])
    const [formShowed, setForm] = useState(false)

    const [formTodoId, setTodoFormId] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
          async function loadTodos() {
            return TodoApi.getAll();
          }

          loadTodos().then((result) => {

            setTodos([...result])
            setLoad(true)
          })
        }
      fetchData();
      }, []
    )

    async function addTodos(params) {
        let new_todo = new ToDoItemModel(null, params ,false)
        if (new_todo.save() === true) {
            todos.push(new_todo)
            setTodos([...todos])
            hideForm()
        } else {
            new_todo = null
            alert('smth went wrong')
        }
    }

    function toggleTodos(id) {
      setTodos(
        todos.map(todo => {
          if (id === todo.id) {
            todo.completed = !todo.completed
            todo.update()
          }
          return todo
        })
      )
    }

    function updateTodo(id, title) {
      setTodos(
        todos.map(todo => {
          if (id === todo.id) {
            todo.title = title
            todo.update()
          }
          return todo
        })
      )
    }

    function deleteTodo(id) {
      let newTodoList = todos.filter(todo => {
        if (id !== todo.id) {
          return todo
        } else {
          todo.delete()
          todo = null
        }
      })
      setTodos([...newTodoList])
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
            { loaded === false &&
              <h2>
                 Loading...
              </h2>
            }
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