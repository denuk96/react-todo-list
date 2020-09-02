import React from 'react';
import Header from "./shared/header";
import Main from "./shared/main";

// import Context from "./context";
// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import todoReducer from "./Todo/store/todoReducer";
// import logo from './logo.svg';
// import './App.css';

function App() {
  // window.store = createStore(todoReducer, todoReducer([], {type: '__init__'}), composeWithDevTools(applyMiddleware(thunk)))

  return (
      <div className='wrapper'>
        <Header/>
        <Main/>
      </div>
  );
}

export default App;
