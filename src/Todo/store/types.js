import TodoApi from "../api/api";
import ToDoItemModel from "../model/ToDoItemModel";

export const addTodoAction = title => {
  return {
    type: 'todos/addTodo',
    playload: {
      title: title
    }
  }
}

export function addTodoActionAsync(params) {
  return function(dispatch) {
    // let new_todo = new ToDoItemModel(null, params ,false)
    //
    // async function f() {
    //   new_todo.save()
    // }
    // return f().then(() => {
    //   dispatch(addTodoAction(params))
    // })


    let new_todo = new ToDoItemModel(null, params ,false)

    async function f() {
      new_todo.save()
    }

    return f().then(() => {
      dispatch(addTodoAction(new_todo))
    });


    return {
      type: "load"
    }
  };
}


export const toggleTodoAction = id => {
  return {
    type: 'todos/toggleTodo',
    playload: {
      id: id
    }
  }
}

export const updateTodoAction = (id, title) => {
  return {
    type: 'todos/updateTodo',
    playload: {
      id: id,
      title: title
    }
  }
}

export const deleteTodoAction = id => {
  return {
    type: 'todos/deleteTodo',
    playload: {
      id: id
    }
  }
}