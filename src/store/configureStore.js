import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(thunk, sagaMiddleware)
	);
}
