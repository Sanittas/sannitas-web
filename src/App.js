import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logoff from './pos-login/Logoff';
import Cadastro from './Cadastro';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/login/logoff' element={<Logoff />} />
        <Route path="/cadastro/*" element={<Cadastro/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
