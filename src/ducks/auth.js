import { spawn, takeLatest, put, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import {getData, postData} from "../api/apiDataFetch";

// types
const moduleName = 'auth'

const link = 'https://young-chamber-53830.herokuapp.com/todo_items/'

const SIGN_IN_START = `${moduleName}/signInStart`
const SIGN_IN_TRY = `${moduleName}/signInTry`
const SIGN_IN = `${moduleName}/signIn`

// reducer
const ReducerRecord = Record({
	user: null,
	signedIn: false,
	access_token: null,
})

// actions

export const signInTry = () => ({
	type: SIGN_IN_TRY
})

export const signIn = (token) => ({
	type: SIGN_IN,
	payload: token
})

export function reducer(state = new ReducerRecord(), action) {
	const {type, payload} = action

	switch (type) {
		case SIGN_IN_TRY:
			// return state.set('access_token', payload)
		case SIGN_IN:
			console.log('SIGN_IN')
			return state.set('access_token', payload)
		default:
			return state
	}
}



const tokensFromLocalStorage = () => {
	return {
		access_token: window.localStorage.getItem('access_token'),
		// refresh_token: window.localStorage.getItem('refresh_token')
	};
}

function* initAuthSaga() {
	const localTokens = tokensFromLocalStorage()
	try {

	} catch (e) {

	}

}

export const auth = function*() {
	yield spawn(initAuthSaga)
	// yield takeLatest(SIGN_IN)
}
