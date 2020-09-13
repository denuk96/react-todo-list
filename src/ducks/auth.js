import { spawn, takeLatest, put, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import {getData, postData} from "../api/apiDataFetch";
import {addTodoAction, hideTodosLoader} from "../components/Todo/store/actions";
import {showErrors, showNotices} from "../components/Message/store/actions";

// types
const moduleName = 'auth'

const link = 'https://young-chamber-53830.herokuapp.com/'

const SIGN_IN_START = `${moduleName}/signInStart`
const SIGN_IN_TRY = `${moduleName}/signInTry`
const SIGN_IN = `${moduleName}/signIn`


// actions

export const signInTry = (email, password) => ({
	type: SIGN_IN_TRY,
	payload: {
		email: email,
		password: password
	}
})

export const signIn = (token) => ({
	type: SIGN_IN,
	payload: token
})

// reducer
const ReducerRecord = Record({
	user: null,
	signedIn: false,
	access_token: null,
	errors_from_server: null,
})

export function reducer(state = new ReducerRecord(), action) {
	const {type, payload} = action

	switch (type) {
		case SIGN_IN_TRY:
			console.log('reducer:', payload)
			return state
			// return state.set('access_token', payload)
		case SIGN_IN:
			console.log('SIGN_IN')
			return state.set('access_token', payload)
		default:
			return state
	}
}


function* initAuthSaga() {
	console.log('i')
	// const localTokens = window.localStorage.getItem('access_token')
	// if (localTokens != null) {
	//
	// }
}

function* signInRequest(action) {
	try {
		const response = yield call(
			postData, `${link}sign_in`, 'POST', action.payload
		)
		console.log(response)
	} catch(e) {
		console.log('server-error: ')
		console.log(e)
	}
}

export const auth = function*() {
	yield spawn(initAuthSaga)
	yield takeLatest(SIGN_IN_TRY, signInRequest)
}
