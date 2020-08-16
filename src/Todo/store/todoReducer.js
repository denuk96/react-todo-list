import TodoApi from "../api/api";
import ToDoItemModel from "../model/ToDoItemModel";

function todoReducer(state, action) {
  switch (action.type) {
    case '__init__':
      state = TodoApi.getAll();
      break

    case 'todos/addTodo':
      let new_todo = new ToDoItemModel(null, action.playload.title ,false)
      if (new_todo.save() === true) {
        state.push(new_todo)
      }
      break

    case 'todos/toggleTodo':
      state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.completed = !todo.completed
          todo.update()
        }
      })
      break

    case 'todos/updateTodo':
      state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.title = action.playload.title
          todo.update()
        }
        return todo
      })
      break

    case 'todos/deleteTodo':
      state = state.filter(todo => {
        if (action.playload.id !== todo.id) {
          return todo
        } else {
          todo.delete()
          todo = null
        }
      })
  }

  return state
}

export default todoReducer