import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ToDoItemModel from "./ToDoItemModel";
import Context from "../context";

const styles = {
    ul: {
        listStyle: 'none'
    }
}

function TodoList() {
    const [todos, setTodos] = React.useState([
      new ToDoItemModel('buy bread'),
      new ToDoItemModel('buy butter'),
      new ToDoItemModel('buy milk'),
    ])

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
        let new_todo = new ToDoItemModel(params)
        todos.push(new_todo)
        setTodos([...todos])
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