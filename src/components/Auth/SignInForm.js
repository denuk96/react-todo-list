import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";

export default function SignInForm({show, toggleSignInForm, onSubmit}) {
	const dispatch = useDispatch()

	function onSubmit(event) {
		event.preventDefault()
		const data = new FormData(event.target);

		console.log(event)
	}

	return (
		<Modal show={show} onHide={toggleSignInForm}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={onSubmit}>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						<Form.Text className="text-muted">
							We'll never share your email with anyone else.
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
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