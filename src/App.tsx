import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate=useNavigate()
  return (
    <div className="App">
      <button className='p-10 bg-black text-white text-3xl rounded-2xl' onClick={()=>navigate("/events")}> Events page</button>
    </div>
  );
}

export default App;
