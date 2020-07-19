import React from "react";
import TodoItem from "./TodoItem";

const styles = {
    ul: {
        listStyle: 'none'
    }
}

function TodoList() {
    const [todos, setTodos] = React.useState([
      { id: 1, title: 'buy bread', completed: false },
      { id: 2, title: 'buy butter', completed: false },
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
      </div>
    )
}

export default TodoList