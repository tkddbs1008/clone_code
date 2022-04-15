import React from 'react'
import { Route, Routes } from "react-router-dom";


//pages
import Signup from '../pages/signup'
import Login from '../pages/login';
import Header from './header';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Header/>}/>
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
