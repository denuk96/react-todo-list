import {call, put, spawn, takeLatest, select, takeEvery, fork} from 'redux-saga/effects'
import {getData, postData} from "../api/apiDataFetch";
import {getUserSignedIN, getAccessToken, SIGN_IN_SUCCESS} from "./auth";
import {showErrors, showNotices} from "./message";

const link = 'https://young-chamber-53830.herokuapp.com/todo_items/'

// TYPES
export const TRY_GET_TODOS = 'todos/tryGetTodos'
export const GET_TODOS = 'todos/getTodos'
export const TRY_ADD_TODO = 'todos/tryAddTodo'
export const ADD_TODO = 'todos/addTodo'
export const TRY_TOGGLE_TODO = 'todos/tryToggleTodo'
export const TOGGLE_TODO = 'todos/toggleTodo'
export const TRY_UPDATE_TODO = 'todos/tryUpdateTodo'
export const UPDATE_TODO = 'todos/updateTodo'
export const TRY_DELETE_TODO = 'todos/tryDeleteTodo'
export const DELETE_TODO = 'todos/deleteTodo'
export const TOGGLE_FORM = 'todos/toggleForm'
export const SHOW_LOADER = 'todos/showLoader'
export const HIDE_LOADER = 'todos/hideLoader'

// REDUCER
const initialState = {
  todos: [],
  todosLoader: true,
  errors: [],
  notices: []
}

export default function todoReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TODOS:
      return state = {...state, todos: state.todos.concat(payload.todos), todosLoader: false}

    case ADD_TODO:
      return {...state, todos: state.todos.concat(payload.todo), todosLoader: false}

    case TOGGLE_TODO:
      return {...state, todos: state.todos.map(todo => {
          if (payload.id === todo.id) {
            todo.completed = !todo.completed
          }
          return todo
        })}

    case UPDATE_TODO:
      return {...state, todosLoader: false, todos: state.todos.map(todo => {
          if (payload.id === todo.id) {
            todo.title = payload.title
          }
          return todo
        })}

    case DELETE_TODO:
      return {...state, todos: state.todos.filter(todo => {
          if (payload.id !== todo.id) {
            return todo
          }
        })}

    case TOGGLE_FORM:
      return {...state, todos: state.todos.map(todo => {
          if (payload.id === todo.id) {
            todo.showForm = !todo.showForm
          } else {
            todo.showForm = false
          }
          return todo
        })}

    case SHOW_LOADER:
      return state = {...state, todosLoader: true}

    case HIDE_LOADER:
      return state = {...state, todosLoader: false}

    default:
      return state
  }
}

// ACTION CREATORS
export const tryAddTodoAction = todo => {
  return {
    type: TRY_ADD_TODO,
    payload: {
      todo: todo
    }
  }
}

export const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    payload: {
      todo: todo
    }
  }
}

export const tryToggleTodoAction = todo => {
  return {
    type: TRY_TOGGLE_TODO,
    payload: {
      id: todo.id,
      completed: todo.completed
    }
  }
}

export const toggleTodoAction = id => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id: id
    }
  }
}

export const tryUpdateTodoAction = (id, title) => {
  return {
    type: TRY_UPDATE_TODO,
    payload: {
      id: id,
      title: title
    }
  }
}

export const updateTodoAction = (id, title) => {
  return {
    type: UPDATE_TODO,
    payload: {
      id: id,
      title: title
    }
  }
}

export const tryDeleteTodoAction = id => {
  return {
    type: TRY_DELETE_TODO,
    payload: {
      id: id
    }
  }
}

export const deleteTodoAction = id => {
  return {
    type: DELETE_TODO,
    payload: {
      id: id
    }
  }
}

export const ToggleFormTodoAction = id => {
  return {
    type: TOGGLE_FORM,
    payload: {
      id: id
    }
  }
}

export const tryGetTodosAction = () => {
  return {
    type: TRY_GET_TODOS
  }
}

export const getTodosAction = (todos) => {
  return {
    type: GET_TODOS,
    payload: {
      todos: todos
    }
  }
}

export const showTodosLoader = () => {
  return {
    type: SHOW_LOADER,
    payload: true
  }
}

export const hideTodosLoader = () => {
  return {
    type: HIDE_LOADER,
    payload: false
  }
}

// logic
function* initTodoSaga() {
  const signedIn = yield select(getUserSignedIN)
  if (signedIn) { yield spawn(loadTodos); }
}

function* loadTodos() {
  yield put(showTodosLoader())
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(getData, link, 'GET', accessToken)
    if (response.code === 200) {
      yield put(getTodosAction(response.body))
    } else {
      // yield put(errors)
    }
  } catch (e) {
    console.error(e)
  }
  yield put(hideTodosLoader())
}

function* tryAddTodo(action) {
  yield put(showTodosLoader())
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link, 'POST', {title: action.payload.todo}, accessToken)
    const data = response.body
    if (response.code === 200) {
      yield put(addTodoAction({id: data.id, title: data.title, completed: data.completed}))
      yield put(showNotices(`Todo added with id-${data.id}.`))
    } else {
      yield put(showErrors(data.errors))
    }
  } catch (e) {
    yield put(showErrors('smth went wrong..'))
  }
  yield put(hideTodosLoader())
}

function* tryToggleTodo(action) {
  const {id, completed} = action.payload
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link + id, 'PUT', {completed: !completed}, accessToken)
    const data = response.body
    if (response.code === 200) {
      yield put(toggleTodoAction(id))
    } else {
      yield put(showErrors('cant toggle'))
    }
  } catch (e) {
    yield put(showErrors(e))
  }
}

function* tryUpdateTodo(action) {
  const {id, title} = action.payload
  yield put(showTodosLoader())
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link + id, 'PUT', {title}, accessToken)
    const data = response.body
    if (response.code === 200) {
      yield put(updateTodoAction(id, title))
      yield put(showNotices('Todo Updated.'))
    } else {
      yield put(showErrors(data.errors))
    }
  } catch (e) {
    yield put(showErrors(e))
  }
  yield put(hideTodosLoader())
}

function* tryDeleteTodo(action) {
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link + action.payload.id, 'DELETE', {}, accessToken)
    const data = response.body
    if (response.code === 200) {
      yield put(deleteTodoAction(action.payload.id))
    } else {
      yield put(showErrors(data.errors))
    }
  } catch (e) {
    yield put(showErrors('smth went wrong with deleting'))
  }
  yield put(hideTodosLoader())
}

export const todoSaga = function* () {
  yield takeLatest(SIGN_IN_SUCCESS, initTodoSaga)
  yield takeEvery(TRY_GET_TODOS, loadTodos)
  yield takeLatest(TRY_ADD_TODO, tryAddTodo)
  yield takeLatest(TRY_TOGGLE_TODO, tryToggleTodo)
  yield takeLatest(TRY_UPDATE_TODO, tryUpdateTodo)
  yield takeLatest(TRY_DELETE_TODO, tryDeleteTodo)
}
