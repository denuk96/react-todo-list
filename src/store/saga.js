import { spawn } from 'redux-saga/effects'
import { auth } from "../ducks/auth";
import { todoSaga } from "../ducks/todo";

export default function*() {
	yield spawn(auth)
	yield spawn(todoSaga)
}