import React from 'react';
import Header from "./shared/header";
import Main from "./shared/main";
import Message from "./components/Message/message";

export default function App() {
  return (
      <div className='wrapper'>
        <Header/>
        <Message/>
        <Main/>
      </div>
  );
}
