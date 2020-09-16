import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, Modal} from "react-bootstrap";
import {Loader} from "../Loader/loader";
import {signUpTry} from "../../ducks/auth";

export default function SignUpForm({show, toggleSingUpForm}) {
	const dispatch = useDispatch()
	const { register, handleSubmit, errors, watch } = useForm();
	const showLoading = useSelector(state => state.authReducer.loading)
	const errorsFromServer = useSelector(state => state.authReducer.errors_from_server)

	const onSubmit = (data) => {
		let {email, password} = data
		dispatch(signUpTry({email, password}))
	}

	if (showLoading) {
		return (
			<Modal show={show} onHide={toggleSingUpForm}>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<Loader/>
				</Modal.Body>
			</Modal>
		)
	}

	return (
		<Modal show={show} onHide={toggleSingUpForm}>
			<Modal.Header closeButton>
				<Modal.Title>Sign Up</Modal.Title>
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

					<Form.Group controlId="formBasicPasswordConfirmation">
						<Form.Label>Password Confirmation</Form.Label>
						{errors.passwordConfirmation && <p className='warning-message'>Password Confirmation should match with password</p>}
						<Form.Control ref={register({
							required: true,
							validate: (value) => value === watch('password') })}
						  type="password" name="passwordConfirmation" placeholder="Password Confirmation" />
					</Form.Group>

					<Button variant="primary" type="submit">
						Sign Up
					</Button>
				</Form>
			</Modal.Body>
			<Modal.Footer>
			</Modal.Footer>
		</Modal>
	)
}