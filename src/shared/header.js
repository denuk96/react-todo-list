import React, {useState} from "react";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import { Button } from 'react-bootstrap';
import SignInForm from "../components/Auth/SignInForm";
import {clearError} from "../ducks/auth";

function Header() {
	const dispatch = useDispatch()
	const signedIn = useSelector(state => state.authReducer.signedIn)
	const [showSignForm, setSignForm] = useState(false);

	function toggleSignInForm() {
		setSignForm(!showSignForm)
		dispatch(clearError())
	}

	return (
		<>
			<header>
				<nav>
					<ul>
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/todolist'>Todo List</Link></li>
						{ !signedIn &&
							<li>
								<Button onClick={toggleSignInForm}>
									sign in
								</Button>
							</li>
						}
					</ul>
				</nav>
			</header>
			{!signedIn &&
				<SignInForm show={showSignForm} toggleSignInForm={toggleSignInForm}/>
			}
		</>
	);
}

export default Header;