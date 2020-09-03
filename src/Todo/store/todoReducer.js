import TodoApi from "../api/api";

export default function todoReducer(state = TodoApi.getAll(), action) {
  switch (action.type) {
    case 'todos/addTodo':
      return [...state, action.playload.title]

    case 'todos/toggleTodo':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.completed = !todo.completed
          todo.update()
        }
        return todo
      })

    case 'todos/updateTodo':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.title = action.playload.title
          todo.update()
        }
        return todo
      })

    case 'todos/deleteTodo':
      return state.filter(todo => {
        if (action.playload.id !== todo.id) {
          return todo
        } else {
          todo.delete()
          todo = null
        }
      })

    case 'todos/toggleForm':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.showForm = !todo.showForm
        } else {
          todo.showForm = false
        }
        return todo
      })

    default:
      return TodoApi.getAll();
  }
}