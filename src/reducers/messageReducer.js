
import {SHOW_NOTICE, HIDE_ERROR, HIDE_NOTICE, SHOW_ERROR} from "../components/Message/store/types";

export default function messageReducer(state = {notices: '', errors: '' }, action) {
	const { type, playload } = action

	switch (type) {
		case SHOW_NOTICE:
			return state = {...state, notices: state.notices.concat(playload.notices)}

		case HIDE_NOTICE:
			return state = {...state, notices: []}

		case SHOW_ERROR:
			return state = {...state, errors: state.errors.concat(playload.errors)}

		case HIDE_ERROR:
			return state = {...state, errors: []}

		default:
			return state
	}
}