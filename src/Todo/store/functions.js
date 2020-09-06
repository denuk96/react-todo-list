import {getData, postData} from "../../api/apiDataFetch";
import {
  addTodoAction,
  deleteTodoAction,
  getTodosAction,
  ToggleFormTodoAction,
  toggleTodoAction,
  updateTodoAction
} from "./actions";

const link = 'https://young-chamber-53830.herokuapp.com/todo_items/'

export function addTodoActionAsync(params) {
  return function(dispatch) {
    postData(link, 'POST', {title: params})
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
    postData(link + params.id, 'PUT', {completed: !params.completed})
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
    postData(link + id, 'PUT', {title: title})
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
    postData(link + id, 'DELETE')
      .then((data) => {
        if (data.errors == null) {
          dispatch(deleteTodoAction(id))
        } else {
          console.log(data.errors)
        }
      });
  }
}

export function getTodosActionAsync() {
  return function(dispatch) {
    getData(link, 'GET')
      .then((data) => {
        if (data.errors == null) {
          dispatch(getTodosAction(data))
        } else {
          console.log(data.errors)
        }
      });
  }
}

export function ToggleFormTodoActionAsync(id) {
  return function(dispatch) {
    dispatch(ToggleFormTodoAction(id))
  }
}