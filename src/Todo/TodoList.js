import React, { useEffect } from "react";
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
    const [loaded, setLoad] = React.useState(false)
    const [todos, setTodos] = React.useState([])

    async function firstAsync() {
        if (loaded === false) {
            let promise = new Promise((res, rej) => {
                setTimeout(() => res(TodoApi.getAll()), 2000)

            });

            let result = await promise;

            setLoad(true)
            setTodos([...result])
        }
    }
    firstAsync();

    function toggleTodos(id) {
      setTodos(
        todos.map(todo => {
          if (id === todo.id) {
            todo.toggleCompleted()
          }
          return todo
        })
      )
    }

    function addTodos(params) {
        let new_todo = new ToDoItemModel(null,params ,false)
        if (new_todo.save() === true) {
            todos.push(new_todo)
            setTodos([...todos])
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
        }
      })
      setTodos([...newTodoList])
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
          <TodoForm addTodos={addTodos}/>
        </div>
      </Context.Provider>
    )
}

export default TodoList