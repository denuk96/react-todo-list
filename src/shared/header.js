import React, {useState} from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-bootstrap';
import SignInForm from "../components/Auth/SignInForm";
import {clearError} from "../ducks/auth";
import SignOutButton from "../components/Auth/SignOutButton";
import SignUpForm from "../components/Auth/SignUpForm";

export default function Header() {
	const dispatch = useDispatch()
	const signedIn = useSelector(state => state.authReducer.signedIn)
	const [showSignInForm, setSignInForm] = useState(false);
	const [showSignUpForm, setSignUpForm] = useState(false);

	function toggleSignInForm() {
		setSignInForm(!showSignInForm)
		dispatch(clearError())
	}

	function toggleSingUpForm() {
		setSignUpForm(!showSignUpForm)
	}

	return (
		<>
			<header>
				<nav>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/todolist'>Todo List</Link></li>
						{ !signedIn &&
							<>
								<li>
									<Button onClick={toggleSignInForm}>
										Sign in
									</Button>
								</li>
								<li>
									<Button onClick={toggleSingUpForm}>
										Sign Up
									</Button>
								</li>
							</>
						}
						{ signedIn &&
							<li>
								<SignOutButton/>
							</li>
						}
					</ul>
				</nav>
			</header>
			{!signedIn &&
				<>
					<SignInForm show={showSignInForm} toggleSignInForm={toggleSignInForm}/>
					<SignUpForm show={showSignUpForm} toggleSingUpForm={toggleSingUpForm}/>
				</>
			}
		</>
	);
}