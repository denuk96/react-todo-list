import {ADD_TODO, TOGGLE_TODO, DELETE_TODO, GET_TODOS, TOGGLE_FORM, UPDATE_TODO} from "../Todo/store/types";

export default function todoReducer(state = [], action) {
  const { type, playload } = action

  switch (type) {
    case ADD_TODO:
      return [...state, playload.todo]

    case TOGGLE_TODO:
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.completed = !todo.completed
        }
        return todo
      })

    case UPDATE_TODO:
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.title = playload.title
        }
        return todo
      })

    case DELETE_TODO:
      return state.filter(todo => {
        if (playload.id !== todo.id) {
          return todo
        }
      })

    case TOGGLE_FORM:
      return state.map(todo => {
        if (playload.id === todo.id) {
          todo.showForm = !todo.showForm
        } else {
          todo.showForm = false
        }
        return todo
      })

    case GET_TODOS:
      return state = [...playload.todos]

    default:
      return state
  }
}