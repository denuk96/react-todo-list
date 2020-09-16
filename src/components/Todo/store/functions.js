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
  return function(dispatch, getState) {
    console.log(getState())
    getData(link, 'GET')
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
          dispatch(getTodosAction(data))
        } else {
          dispatch(showErrors(data.errors))
        }
      });
  }
}

export function addTodoActionAsync(params) {
  return dispatch => {
    postData(link, 'POST', {title: params})
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
          dispatch(addTodoAction({id: data.id, title: data.title, completed: data.completed}))
          dispatch(showNotices('Todo added.'))
        } else {
          dispatch(hideTodosLoader())
          dispatch(showErrors(data.errors))
        }
      })
  };
}

export function toggleTodoActionAsync(params) {
  return function(dispatch) {
    postData(link + params.id, 'PUT', {completed: !params.completed})
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
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
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
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
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
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