import React from 'react';
import Header from "./shared/header";
import Main from "./shared/main";
import {createStore} from "redux";
import todoReducer from "./Todo/store/todoReducer";
// import logo from './logo.svg';
// import './App.css';

function App() {
  window.store = createStore(todoReducer, [])

  return (
      <div className='wrapper'>
        <Header/>
        <Main/>
      </div>
  );
}

export default App;
