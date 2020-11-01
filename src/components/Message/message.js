import React from "react";
import {hideErrors, hideNotices} from "../../ducks/message";
import {connect} from "react-redux";

function Message(props) {
	const notice = (notices) => (
		<div className="alert alert-success" role="alert">
			{notices.join(' ')}
		</div>
	)

	const error = (errors) => (
		<div className="alert alert-danger" role="alert">
			{errors.join(' ')}
		</div>
	)

	return(
		<div>
			{(props.notices.length > 0) && notice(props.notices)}
			{(props.errors.length > 0) && error(props.errors)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		notices: state.messageReducer.notices,
		errors: state.messageReducer.errors
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		hideNotices: () => dispatch(hideNotices),
		hideErrors: () => dispatch(hideErrors)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);