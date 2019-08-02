import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import Main from './Components/Main'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
