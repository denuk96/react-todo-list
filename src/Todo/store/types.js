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









async function postData(url = '', method = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}