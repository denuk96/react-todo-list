import TodoApi from "../api/api";
import ToDoItemModel from "../model/ToDoItemModel";

function todoReducer(state = TodoApi.getAll(), action) {
  switch (action.type) {
    case 'todos/addTodo':
      // console.log(action)
      return [...state, action.playload.title]
      // let new_todo = new ToDoItemModel(null, action.playload.title ,false)
      // if (new_todo.save() === true) {
      //   state.push(new_todo)
      // }

    case 'todos/toggleTodo':
      return state.map(todo => {
        if (action.playload.id === todo.id) {
          todo.completed = !todo.completed
          todo.update()
        }
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

    default:
      return TodoApi.getAll();
  }
}

export default todoReducer