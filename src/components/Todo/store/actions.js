import {ADD_TODO, UPDATE_TODO, TOGGLE_FORM, GET_TODOS, DELETE_TODO, TOGGLE_TODO, SHOW_LOADER, HIDE_LOADER} from "./types";

export const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    playload: {
      todo: todo
    }
  }
}

export const toggleTodoAction = id => {
  return {
    type: TOGGLE_TODO,
    playload: {
      id: id
    }
  }
}

export const updateTodoAction = (id, title) => {
  return {
    type: UPDATE_TODO,
    playload: {
      id: id,
      title: title
    }
  }
}

export const deleteTodoAction = id => {
  return {
    type: DELETE_TODO,
    playload: {
      id: id
    }
  }
}

export const ToggleFormTodoAction = id => {
  return {
    type: TOGGLE_FORM,
    playload: {
      id: id
    }
  }
}

export const getTodosAction = (todos) => {
  return {
    type: GET_TODOS,
    playload: {
      todos: todos
    }
  }
}

export const showTodosLoader = () => {
  return {
    type: SHOW_LOADER,
    playload: true
  }
}

export const hideTodosLoader = () => {
  return {
    type: HIDE_LOADER,
    playload: false
  }
}