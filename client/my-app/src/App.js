import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ייבוא מ-react-router-dom

import Home from './Component/Home/Home_User.jsx';
import Home_Maneger from './Component/Home/Home_Maneger.jsx';
import LoginDemo from './Component/login/Login.jsx';
import { useDispatch,useSelector } from 'react-redux';
import Hhh from './Component/hhh.jsx';
import CardApartmen from './Component/Apartmen_User/AllApartmen.jsx';
import Cardapartmen_Maneger from './Component/Apartment_Maneger/AllApartmen_Maneger.jsx';
import MyApartment from './Component/Apartmen_User/MyApartment.jsx';
import Myfavorites from './Component/Apartmen_User/Myfavorites.jsx';
import Apartmentconfirm from './Component/Apartment_Maneger/Apartmentconfirm.jsx';
import Users from './Component/Apartment_Maneger/Users.jsx';
function App() {
  const { token, role, user } = useSelector((state) => state.token);

  return (<>
{role=="User"?  <Home></Home>:role=="Manager"?<Home_Maneger></Home_Maneger>:<></>}
    <Routes>
      <Route path='/myfavorites'element={<Myfavorites/>}/>
      <Route path="/" element={< LoginDemo />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/cardApartmen" element={<CardApartmen/>} />
      <Route path="/Cardapartmen_Maneger" element={<Cardapartmen_Maneger/>} />
     < Route path="/myapartment"element={<MyApartment/>}/>
      {/* <Route path="/card-apartmen" element={<Cardapartmen />} /> */}
      < Route path="/Apartmentconfirm"element={<Apartmentconfirm/>}/>
      <Route path="/Users" element={<Users />} />
    </Routes>
 
     
      
    </>
);
}

export default App;
