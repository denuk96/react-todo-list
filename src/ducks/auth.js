import { spawn, takeLatest, put, call } from 'redux-saga/effects'
import { Record } from 'immutable'
import {getData, postData} from "../api/apiDataFetch";
import {showErrors} from "../components/Message/store/actions";

// types
const moduleName = 'auth'

const link = 'https://young-chamber-53830.herokuapp.com/'

const AUTH_IS_LOADING = `${moduleName}/signInLoading`
const SIGN_IN_TRY = `${moduleName}/signInTry`
const SIGN_UP_TRY = `${moduleName}/signUpTry`
const SIGN_IN = `${moduleName}/signIn`
const SIGN_OUT = `${moduleName}/signOut`
const SET_ERROR = `${moduleName}/setError`
const CLEAR_ERROR = `${moduleName}/clearError`

// actions
export const authLoading = () => ({
	type: AUTH_IS_LOADING
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

export const signOut = () => ({
	type: SIGN_OUT,
})

export const signUpTry = (params) => ({
	type: SIGN_UP_TRY,
	payload: params
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

		case SIGN_OUT:
			return state.set('access_token', null)
									.set('signedIn', false)

		case SET_ERROR:
			return state.set('errors_from_server', payload).set('loading', false)

		case CLEAR_ERROR:
			return state.set('errors_from_server', null)

		case AUTH_IS_LOADING:
			return state.set('loading', true)

		default:
			return state
	}
}

function* initAuthSaga() {
	const localTokens = window.localStorage.getItem('access_token')
	try {
		const response = yield call(
			getData, `${link}user_info/?access_token=${localTokens}`, 'GET'
		)
		if (response.code === 200) {
			yield put(signIn(response.body.access_token))
		}
	} catch (e) {
		yield put(showErrors('Auth server error'))
	}
}

function* signInRequest(action) {
	yield put(authLoading())
	try {
		const response = yield call(
			postData, `${link}sign_in`, 'POST', action.payload
		)
		if (response.code === 200) {
			const token = response.body.access_token
			window.localStorage.setItem('access_token', token)
			yield put(signIn(token))
		} else {
			yield put(setError(response.body.errors))
		}
	} catch(e) {
		yield put(setError('server-error'))
	}
}

function* signOutUser() {
	yield call (() => { return window.localStorage.removeItem('access_token')})
}

function* tryToSignUp(action) {
	yield put(authLoading())
	try {

	} catch (e) {

	}
}

export const auth = function*() {
	yield spawn(initAuthSaga)
	yield takeLatest(SIGN_IN_TRY, signInRequest)
	yield takeLatest(SIGN_OUT, signOutUser)
	yield takeLatest(SIGN_UP_TRY, tryToSignUp)
}
