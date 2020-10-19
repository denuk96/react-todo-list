import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
		}) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(thunk, sagaMiddleware),
);

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		enhancer
	);
}
