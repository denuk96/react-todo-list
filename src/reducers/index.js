import { combineReducers } from 'redux';
import todoReducer from "./todoReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
	todoReducer,
	messageReducer
});