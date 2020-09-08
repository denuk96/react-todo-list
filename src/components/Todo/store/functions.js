import {getData, postData} from "../../../api/apiDataFetch";
import {
  addTodoAction,
  deleteTodoAction,
  getTodosAction,
  ToggleFormTodoAction,
  toggleTodoAction,
  updateTodoAction,
  showTodosLoader,
  hideTodosLoader
} from "./actions";
import {showErrors, showNotices} from "../../Message/store/actions";

const link = 'https://young-chamber-53830.herokuapp.com/todo_items/'

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

export function addTodoActionAsync(params) {
  return dispatch => {
    postData(link, 'POST', {title: params})
      .then((data) => {
        if (data.errors == null) {
          dispatch(addTodoAction({id: data.id, title: data.title, completed: data.completed}))
          dispatch(showNotices('Todo added.'))
        } else {
          dispatch(hideTodosLoader())
          dispatch(showErrors(data.errors))
        }
      });
  };
}

export function toggleTodoActionAsync(params) {
  return function(dispatch) {
    dispatch()
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
  return dispatch => {
    postData(link + id, 'PUT', {title: title})
      .then((data) => {
        if (data.errors == null) {
          dispatch(updateTodoAction(id, title))
          dispatch(showNotices('Todo updated'))
        } else {
          dispatch(hideTodosLoader())
          dispatch(showErrors(data.errors))
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

export function ToggleFormTodoActionAsync(id) {
  return function(dispatch) {
    dispatch(ToggleFormTodoAction(id))
  }
}

export function ShowTodosLoader() {
  return function(dispatch) {
    dispatch(showTodosLoader())
  }
}

export function HideTodosLoader() {
  return function(dispatch) {
    dispatch(hideTodosLoader())
  }
}