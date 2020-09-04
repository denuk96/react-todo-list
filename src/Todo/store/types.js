import postData from "../../api/apiDataFetch";

const addTodoAction = todo => {
  return {
    type: 'todos/addTodo',
    playload: {
      todo: todo
    }
  }
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

export const ToggleFormTodoAction = id => {
  return {
    type: 'todos/toggleForm',
    playload: {
      id: id
    }
  }
}

// ====

export function addTodoActionAsync(params) {
  return function(dispatch) {
    postData('https://young-chamber-53830.herokuapp.com/todo_items/', 'POST', {title: params})
      .then((data) => {
        if (data.errors == null) {
          dispatch(addTodoAction({id: data.id, title: data.title, completed: data.completed}))
        } else {
          console.log(data.errors)
        }
      });
  };
}

export function toggleTodoActionAsync(params) {
  return function(dispatch) {
    postData('https://young-chamber-53830.herokuapp.com/todo_items/'+params.id, 'PUT', {completed: !params.completed})
      .then((data) => {
        if (data.errors == null) {
          dispatch(toggleTodoAction(params.id))
        } else {
          console.log(data.errors)
        }
      });
  }
}

export function updateTodoActionAsync(id, title) {
  return function(dispatch) {
    postData('https://young-chamber-53830.herokuapp.com/todo_items/'+id, 'PUT', {title: title})
      .then((data) => {
        if (data.errors == null) {
          dispatch(updateTodoAction(id, title))
        } else {
          console.log(data.errors)
        }
      });
  }
}

export function deleteTodoActionAsync(id) {
  return function(dispatch) {
    postData('https://young-chamber-53830.herokuapp.com/todo_items/'+id, 'DELETE')
      .then((data) => {
        if (data.errors == null) {
          dispatch(deleteTodoAction(id))
        } else {
          console.log(data.errors)
        }
      });
  }
}