import React from 'react';
import Header from "./shared/header";
import Main from "./shared/main";
import Store from "./store/store";
import todoReducer from "./Todo/store/todoReducer";
// import logo from './logo.svg';
// import './App.css';

function App() {
  window.store = Store(todoReducer, {})

  return (
      <div className='wrapper'>
        <Header/>
        <Main/>
      </div>
  );
}

export default App;
