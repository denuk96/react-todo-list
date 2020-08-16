export const addTodoAction = title => {
  return {
    type: 'todos/addTodo',
    playload: {
      title: title
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