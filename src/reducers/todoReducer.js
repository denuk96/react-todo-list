import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  GET_TODOS,
  TOGGLE_FORM,
  UPDATE_TODO,
  SHOW_LOADER, HIDE_LOADER
} from "../components/Todo/store/types";
import {initialState} from "../store/initialState";

export default function todoReducer(state = initialState, action) {
  const { type, playload } = action

  switch (type) {
    case GET_TODOS:
      return state = {...state, todos: state.todos.concat(playload.todos), todosLoader: false}

    case ADD_TODO:
      return {...state, todos: state.todos.concat(playload.todo), todosLoader: false}

    case TOGGLE_TODO:
      return {...state, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
            todo.completed = !todo.completed
          }
          return todo
        })}

    case UPDATE_TODO:
      return {...state, todosLoader: false, todos: state.todos.map(todo => {
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

    case SHOW_LOADER:
      return state = {...state, todosLoader: true}

    case HIDE_LOADER:
      return state = {...state, todosLoader: false}

    default:
      return state
  }
}