import {call, put, spawn, takeLatest, select} from 'redux-saga/effects'
import {postData} from "../api/apiDataFetch";
import {getUserSignedIN} from "./auth";
import {showErrors, showNotices} from "../components/Message/store/actions";

const link = 'https://young-chamber-53830.herokuapp.com/todo_items/'

// TYPES
export const TRY_ADD_TODO = 'todos/tryAddTodo'
export const ADD_TODO = 'todos/addTodo'
export const TOGGLE_TODO = 'todos/toggleTodo'
export const UPDATE_TODO = 'todos/updateTodo'
export const DELETE_TODO = 'todos/deleteTodo'
export const TOGGLE_FORM = 'todos/toggleForm'
export const GET_TODOS = 'todos/getTodos'
export const SHOW_LOADER = 'todos/showLoader'
export const HIDE_LOADER = 'todos/hideLoader'

// SELECTORS

export const getAccessToken = state => state.authReducer.access_token

// REDUCER
const initialState = {
  todos: [],
  todosLoader: false,
  errors: [],
  notices: []
}

export default function todoReducer(state = initialState, action) {
  const { type, playload } = action

  switch (type) {
    case GET_TODOS:
      return state = {...state, todos: state.todos.concat(playload.todos), todosLoader: false}

    case ADD_TODO:
      return {...state, todos: state.todos.concat(playload.todo), todosLoader: false}

    case TOGGLE_TODO:
      return {...state, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
            todo.completed = !todo.completed
          }
          return todo
        })}

    case UPDATE_TODO:
      return {...state, todosLoader: false, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
            todo.title = playload.title
          }
          return todo
        })}

    case DELETE_TODO:
      return {...state, todos: state.todos.filter(todo => {
          if (playload.id !== todo.id) {
            return todo
          }
        })}

    case TOGGLE_FORM:
      return {...state, todos: state.todos.map(todo => {
          if (playload.id === todo.id) {
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
    playload: {
      todo: todo
    }
  }
}

export const addTodoAction = todo => {
  return {
    type: ADD_TODO,
    playload: {
      todo: todo
    }
  }
}

export const toggleTodoAction = id => {
  return {
    type: TOGGLE_TODO,
    playload: {
      id: id
    }
  }
}

export const updateTodoAction = (id, title) => {
  return {
    type: UPDATE_TODO,
    playload: {
      id: id,
      title: title
    }
  }
}

export const deleteTodoAction = id => {
  return {
    type: DELETE_TODO,
    playload: {
      id: id
    }
  }
}

export const ToggleFormTodoAction = id => {
  return {
    type: TOGGLE_FORM,
    playload: {
      id: id
    }
  }
}

export const getTodosAction = (todos) => {
  return {
    type: GET_TODOS,
    playload: {
      todos: todos
    }
  }
}

export const showTodosLoader = () => {
  return {
    type: SHOW_LOADER,
    playload: true
  }
}

export const hideTodosLoader = () => {
  return {
    type: HIDE_LOADER,
    playload: false
  }
}

// logic
function* initTodoSaga() {
  const signedIn = yield select(getUserSignedIN)
  if (signedIn) { yield call(loadTodos) }
}

function* loadTodos() {
  yield put(showTodosLoader())
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link, 'GET', accessToken)
    if (response.code === 200) {
      yield put(getTodosAction(response.body))
    } else {
      // yield put(errors)
    }
  } catch (e) {
    // yield put(errors)
  }
  yield put(hideTodosLoader())
}

function* tryAddTodo(action) {
  yield put(showTodosLoader())
  const accessToken = yield select(getAccessToken)
  try {
    const response = yield call(postData, link, 'POST', accessToken)
    const data = response.body
    if (response.code === 200) {
      yield put(addTodoAction({id: data.id, title: data.title, completed: data.completed}))
      yield put(showNotices('Todo added.'))
    } else {
      yield put(showErrors(data.errors))
    }
  } catch (e) {
    yield put(showErrors(e))
  }
  yield put(hideTodosLoader())
}

export const todoSaga = function* () {
  yield spawn(initTodoSaga)
  yield takeLatest(GET_TODOS, loadTodos)
  yield takeLatest(TRY_ADD_TODO, tryAddTodo)
}