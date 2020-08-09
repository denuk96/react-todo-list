import TodoApi from "../Todo/api/api";
import ToDoItemModel from "../Todo/ToDoItemModel";

function rootReducer(state, action, params = null) {
  switch (action.type) {
    case '__init__':
      state = TodoApi.getAll();
      break

    case 'AddTodos':
      let new_todo = new ToDoItemModel(null, params ,false)
      if (new_todo.save() === true) {
        state.push(new_todo)
      }
      break

    case 'toggleTodos':
      state.map(todo => {
        if (params === todo.id) {
          todo.completed = !todo.completed
          todo.update()
        }
      })
      break

    case 'updateTodo':
      state.map(todo => {
        if (params.id === todo.id) {
          todo.title = params.title
          todo.update()
        }
        return todo
      })
      break
    case 'deleteTodo':
      state = state.filter(todo => {
        if (params.id !== todo.id) {
          return todo
        } else {
          todo.delete()
          todo = null
        }
      })
  }

  return state
}

export default rootReducer