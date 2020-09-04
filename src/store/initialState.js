import postData from "../api/apiDataFetch";

export const initialState = () => {
	postData('https://young-chamber-53830.herokuapp.com/todo_items/', 'GET')
		.then((data) => {
			return data
		});
}