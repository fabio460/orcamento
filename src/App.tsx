import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import PriveteRouter from './components/privateRouter';
import Login from './components/Login/login';
import Cadastro from './components/Cadastro/cadastro';
function App() {
  return (
    <BrowserRouter >
       <Routes>
          <Route path='/' element={<PriveteRouter><Home/></PriveteRouter>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>

       </Routes>
    </BrowserRouter>
  );
}

export default App;
