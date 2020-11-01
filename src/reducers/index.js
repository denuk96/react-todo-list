import { combineReducers } from 'redux';
import todoReducer from "../ducks/todo";
import messageReducer from "../ducks/message";
import authReducer from "../ducks/auth";

export default combineReducers({
	todoReducer,
	messageReducer,
	authReducer,
});