import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logoff from './pos-login/Logoff';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/login/logoff' element={<Logoff />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
