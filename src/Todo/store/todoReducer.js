import TodoApi from "../api/api";
import ToDoItemModel from "../model/ToDoItemModel";
import {addTodo, deleteTodos, toggleTodo, updateTodos} from "./types";

function todoReducer(state, action, params = null) {
  switch (action.type) {
    case '__init__':
      state = TodoApi.getAll();
      break

    case addTodo:
      let new_todo = new ToDoItemModel(null, params ,false)
      if (new_todo.save() === true) {
        state.push(new_todo)
      }
      break

    case toggleTodo:
      state.map(todo => {
        if (params === todo.id) {
          todo.completed = !todo.completed
          todo.update()
        }
      })
      break

    case updateTodos:
      state.map(todo => {
        if (params.id === todo.id) {
          todo.title = params.title
          todo.update()
        }
        return todo
      })
      break

    case deleteTodos:
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

export default todoReducer