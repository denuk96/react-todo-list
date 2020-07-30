import React, { useEffect, useState } from "react";
import Context from "../context";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ToDoItemModel from "./ToDoItemModel";
import TodoApi from "./api/api";

const styles = {
    ul: {
        listStyle: 'none'
    }
}

function TodoList() {
    const [loaded, setLoad] = useState(false)
    const [todos, setTodos] = useState([])
    const [formShowed, setForm] = useState(false)

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

    function showForm() {
      setForm(true)
    }

    function hideForm() {
      setForm(false)
    }

    return(
      <Context.Provider value={{deleteTodo}} >
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
                                  onChange={toggleTodos}/>
              })
            }
          </ul>
          {formShowed
            ? <TodoForm addTodos={addTodos}/>
            : <button className='btn btn-primary' onClick={ showForm.bind(null) }>Add todo</button>
          }
        </div>
      </Context.Provider>
    )
}

export default TodoList