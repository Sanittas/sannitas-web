import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Logoff from './pos-login/Logoff';
import Cadastro from './Cadastro';
import CadastroEmpresa from './CadastroEmpresa';
import RedefinirSenha from './redefinirSenha';
import TrocaSenha from './trocaSenha'; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        <Route path='/login/logoff' element={<Logoff />} />
        <Route path="/cadastro/*" element={<Cadastro/>} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa/>} />
        <Route path="/trocaSenha" element={<TrocaSenha/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
