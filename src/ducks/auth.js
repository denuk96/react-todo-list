import { takeEvery } from 'redux-saga/effects'

export const auth = function*() {
	yield takeEvery('todos/getTodos', bla);
}

function* bla() {
	yield console.log('it WORKS')
}