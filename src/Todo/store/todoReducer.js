export const LOAD_DATA_SUCCESS = 'module_name/LOAD_DATA_SUCCESS'

export default function todoReducer(state = [], action) {
  const { type, playload } = action

  switch (type) {
    case LOAD_DATA_SUCCESS:
      return playload

    case 'todos/addTodo':
      return [...state, playload.todo]

    case 'todos/toggleTodo':
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.completed = !todo.completed
        }
        return todo
      })

    case 'todos/updateTodo':
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.title = playload.title
        }
        return todo
      })

    case 'todos/deleteTodo':
      return state.filter(todo => {
        if (playload.id !== todo.id) {
          return todo
        }
      })

    case 'todos/toggleForm':
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.showForm = !todo.showForm
        } else {
          todo.showForm = false
        }
        return todo
      })

    case 'todos/getTodos':
      return state = [...playload.todos]

    default:
      return state
  }
}