import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { signInTry } from "../../ducks/auth";
import { Loader } from "../Loader/loader";

export default function SignInForm({show, toggleSignInForm}) {
	const dispatch = useDispatch()
	const { register, handleSubmit, errors } = useForm();
	const showLoading = useSelector(state => state.authReducer.loading)
	const errorsFromServer = useSelector(state => state.authReducer.errors_from_server)

	const onSubmit = (data) => {
		let {email, password} = data
		dispatch(signInTry(email, password))
	}

	if (showLoading) {
		return (
			<Modal show={show} onHide={toggleSignInForm}>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<Loader/>
				</Modal.Body>
			</Modal>
		)
	}

	return (
		<Modal show={show} onHide={toggleSignInForm}>
			<Modal.Header closeButton>
				<Modal.Title>Sign in</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{errorsFromServer != null &&
				<h5 className='warning-message'>
					{errorsFromServer}
				</h5>
				}
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						{errors.email && <p className='warning-message'>Email is required</p>}
						<Form.Control ref={register({ required: true })}  type="email" name="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						{errors.password && <p className='warning-message'>Password is required</p>}
						<Form.Control ref={register({ required: true })} type="password" name="password" placeholder="Password" />
					</Form.Group>
					<Form.Group controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Check me out" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>
		</Modal>
	)
}