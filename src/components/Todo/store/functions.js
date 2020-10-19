import {getData, postData} from "../../../api/apiDataFetch";
import {showErrors, showNotices} from "../../Message/store/actions";



export function getTodosActionAsync() {
  return function(dispatch, getState) {
    const access_token = getState().authReducer.access_token
    getData(link, 'GET', access_token)
      .then((response) => {
        const data = response.body
        if (response.code === 200) {
          dispatch(getTodosAction(data))
        } else {
          dispatch(hideTodosLoader())
        }
      });
  }
}

export function addTodoActionAsync(params) {
  return (dispatch, getState) => {
    const access_token = getState().authReducer.access_token
    postData(link, 'POST', {title: params}, access_token)
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
  return function(dispatch, getState) {
    const access_token = getState().authReducer.access_token
    postData(link + params.id, 'PUT', {completed: !params.completed}, access_token)
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
  return (dispatch, getState) => {
    const access_token = getState().authReducer.access_token
    postData(link + id, 'PUT', {title: title}, access_token)
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
  return function(dispatch, getState) {
    const access_token = getState().authReducer.access_token
    postData(link + id, 'DELETE', {}, access_token)
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