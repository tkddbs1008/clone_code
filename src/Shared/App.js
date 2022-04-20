import React from 'react'
import { Route, Routes } from "react-router-dom";


//pages
import Signup from '../pages/signup'
import Login from '../pages/login';
import ProfilePage from '../pages/profilePage';
import Main from '../pages/main';
import ProfileEdit from '../pages/ProfileEdit';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Main/>}/>
        <Route path="/signup/*" element={<Signup />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/profile/:user/" element={<ProfilePage/>}>
          <Route path=":post/" element={<ProfilePage/>} />
        </Route>
        <Route path="/Edit/" element={<ProfileEdit/>}/>
      </Routes>
    </div>
  );
}

export default App;
