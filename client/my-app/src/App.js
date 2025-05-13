import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ייבוא מ-react-router-dom

import Home from './Component/Home.jsx';
import LoginDemo from './Component/login/Login.jsx';
import { useDispatch,useSelector } from 'react-redux';
import Hhh from './Component/hhh.jsx';

function App() {
  const { token, role, user } = useSelector((state) => state.token);

  return (<>
{  role=="User"?  <Home></Home>:role=="User"?<Home></Home>:<></>}
    <Routes>
      <Route path="/" element={< LoginDemo />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/empty" element={<Hhh/>} />
    </Routes></>
);
}

export default App;
