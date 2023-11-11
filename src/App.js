import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logoff from './pos-login/Logoff';
import Cadastro from './pages/Cadastro';
import CadastroEmpresa from './pages/CadastroEmpresa';
import RedefinirSenha from './pages/redefinirSenha';
import TrocaSenha from './pages/trocaSenha';
import Cliente from './pages/cliente';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        <Route path='/login/logoff' element={<Logoff />} />
        <Route path="/cadastro/*" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/validarToken/:token" element={<TrocaSenha />} />
        <Route path="/cliente/:idUsuario" element={<Cliente />} />
        <Route path="/cliente/:idUsuario" element={<Cliente />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
