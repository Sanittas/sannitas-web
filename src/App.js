import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import CadastroEmpresa from './pages/CadastroEmpresa';
import CadastrarServicos from './pages/CadastrarServicos';
import RedefinirSenha from './pages/redefinirSenha';
import TrocaSenha from './pages/trocaSenha';
import Cliente from './pages/cliente';
import Servicos from './pages/servicos';
import LoginEmpresa from './pages/LoginEmpresa';
import Empresa from './pages/Empresa';
import Dashboard from './pages/Dashboard';
import Agendamento from './pages/agendamento';
import TestPagamento from './pages/TestPagamento'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinirSenha" element={<RedefinirSenha />} />
        <Route path="/cadastro/*" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/validarToken/:token" element={<TrocaSenha />} />
        <Route path="/cliente/:idUsuario" element={<Cliente />} />
        <Route path="/servicos/:idUsuario" element={<Servicos />} />
        <Route path="/servicos/" element={<Servicos />} />
        {/* <Route path='/servicos/' element={<Servicos />} /> */}
        <Route path="/cadastro/*" element={<Cadastro />} />
        <Route path="/cadastroEmpresa" element={<CadastroEmpresa />} />
        <Route path="/validarToken/:token" element={<TrocaSenha />} />
        <Route path="/cliente/:idUsuario" element={<Cliente />} />
        <Route path="/loginEmpresa" element={<LoginEmpresa />} />
        <Route path="/empresa/:idEmpresa" element={<Empresa />} />
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/empresa/:idEmpresa/CadastrarServicos" element={<CadastrarServicos />} />
        <Route path="/agendamento/:idServico" element={<Agendamento />} />
        <Route path="/testPagamento" element={<TestPagamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
