import React from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ToDoItemModel from "./ToDoItemModel";

const styles = {
    ul: {
        listStyle: 'none'
    }
}

function TodoList() {
    const [todos, setTodos] = React.useState([
      { id: 1, title: 'buy bread', completed: false },
      { id: 2, title: 'buy butter', completed: true },
      { id: 3, title: 'buy milk', completed: false }
    ])

    function toggleTodos(id) {
      setTodos(
        todos.map(todo => {
          if (id === todo.id) {
            todo.completed = !todo.completed
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

    return(
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
    )
}

export default TodoList