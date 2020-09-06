import {ADD_TODO, TOGGLE_TODO, DELETE_TODO, GET_TODOS, TOGGLE_FORM, UPDATE_TODO} from "../components/Todo/store/types";
import {initialState} from "../store/initialState";

export default function todoReducer(state = initialState, action) {
  const { type, playload } = action

  switch (type) {
    case ADD_TODO:
      return {...state, todos: state.todos.concat(playload.todo)}

    case TOGGLE_TODO:
      return {...state, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
            todo.completed = !todo.completed
          }
          return todo
        })}

    case UPDATE_TODO:
      return {...state, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
            todo.title = playload.title
          }
          return todo
        })}

    case DELETE_TODO:
      return {...state, todos: state.todos.filter(todo => {
          if (playload.id !== todo.id) {
            return todo
          }
        })}

    case TOGGLE_FORM:
      return {...state, todos: state.todos.map(todo => {
        if (playload.id === todo.id) {
          todo.showForm = !todo.showForm
        } else {
          todo.showForm = false
        }
        return todo
      })}

    case GET_TODOS:
      return state = {...state, todos: state.todos.concat(playload.todos)}

    default:
      return state
  }
}