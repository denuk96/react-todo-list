import React from 'react';
import TodoList from "./Todo/TodoList";
import Context from "../context";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Context.Provider>
      <div className='wrapper'>
          <TodoList />
      </div>
    </Context.Provider>
  );
}

export default App;
