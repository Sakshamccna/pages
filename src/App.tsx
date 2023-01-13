import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import User from './Components/User';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<User/>}/>
      </Routes>

    </div>
  );
}

export default App;
 