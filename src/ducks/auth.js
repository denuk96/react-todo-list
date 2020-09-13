import { spawn, takeLatest, put, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import {getData, postData} from "../api/apiDataFetch";

// types
const moduleName = 'auth'

const link = 'https://young-chamber-53830.herokuapp.com/'

const SIGN_IN_LOADING = `${moduleName}/signInLoading`
const SIGN_IN_TRY = `${moduleName}/signInTry`
const SIGN_IN = `${moduleName}/signIn`
const SET_ERROR = `${moduleName}/setError`
const CLEAR_ERROR = `${moduleName}/clearError`

// actions
export const singInLoading = () => ({
	type: SIGN_IN_LOADING
})

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

export const setError = (error) => ({
	type: SET_ERROR,
	payload: error
})

export const clearError = () => ({
	type: CLEAR_ERROR
})

// reducer
const ReducerRecord = Record({
	user: null,
	signedIn: false,
	loading: false,
	access_token: null,
	errors_from_server: null,
})

export function reducer(state = new ReducerRecord(), action) {
	const {type, payload} = action

	switch (type) {
		case SIGN_IN:
			return state.set('access_token', payload)
									.set('signedIn', true)
									.set('errors_from_server', null)
									.set('loading', false)

		case SET_ERROR:
			return state.set('errors_from_server', payload).set('loading', false)

		case CLEAR_ERROR:
			return state.set('errors_from_server', null)

		case SIGN_IN_LOADING:
			return state.set('loading', true)

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
	yield put(singInLoading())
	try {
		const response = yield call(
			postData, `${link}sign_in`, 'POST', action.payload
		)
		if (response.code === 200) {
			yield put(signIn(response.body.access_token))
		} else {
			yield put(setError(response.body.errors))
		}

	} catch(e) {
		yield put(setError('server-error'))
	}
}

export const auth = function*() {
	yield spawn(initAuthSaga)
	yield takeLatest(SIGN_IN_TRY, signInRequest)
}
