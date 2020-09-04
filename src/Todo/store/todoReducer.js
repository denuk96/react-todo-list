import TodoApi from "../api/api";

export default function todoReducer(state = TodoApi.getAll(), action) {
  switch (action.type) {
    case 'todos/addTodo':
      console.log(action.playload.todo)
      return [...state, action.playload.todo]

    case 'todos/toggleTodo':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.completed = !todo.completed
        }
        return todo
      })

    case 'todos/updateTodo':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.title = action.playload.title
        }
        return todo
      })

    case 'todos/deleteTodo':
      return state.filter(todo => {
        if (action.playload.id !== todo.id) {
          return todo
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
      return state
  }
}