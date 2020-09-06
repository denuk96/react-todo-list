import React from 'react';
import { Switch, Route } from 'react-router-dom'
import HomePage from "../static/homePage";
import TodoList from "../components/Todo/TodoList";

function Main() {
	return (
		<main>
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route exact path='/todolist' component={TodoList}/>
			</Switch>
		</main>
	);
}

export default Main;