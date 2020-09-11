import React, {useState} from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap';
import SignInForm from "../components/Auth/SignInForm";

function Header() {
	const signedIn = useSelector(state => state.authReducer.signedIn)
	const [showSignForm, setSignForm] = useState(false);

	function toggleSignInForm() {
		setSignForm(!showSignForm)
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

			<SignInForm show={showSignForm} toggleSignInForm={toggleSignInForm}/>
		</>
	);
}

export default Header;