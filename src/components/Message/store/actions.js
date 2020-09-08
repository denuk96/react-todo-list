import {SHOW_NOTICE, HIDE_NOTICE, SHOW_ERROR, HIDE_ERROR} from "./types";

export const showNotices = notices => {
	return {
		type: SHOW_NOTICE,
		playload: {
			notices: notices
		}
	}
}

export const hideNotices = { type: HIDE_NOTICE }

export const showErrors = errors => (
	{
		type: SHOW_ERROR,
		playload: {
			errors: errors
		}
	}
)

export const hideErrors = {	type: HIDE_ERROR }

