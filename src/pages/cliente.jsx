import React from "react";

import { useState } from "react";

import "../css/cliente.css";

import Navbar from "../components/Navbar";

import cadastroImg from "../assets/hospital.jpg";

import apiToken, { api8082 } from "../api/apiToken";

import Swal from "sweetalert2";
import NavbarPosLogin from "../components/NavBarPosLogin";
import { useEffect } from "react";

import Input from "../components/Input";
import Button from "../components/Button";

// Chamar essa página passando o OBJETO do usuário

function Cliente(props) {
  const idUsuario = sessionStorage.getItem("id");

  const [nome, setNome] = useState(props.nome);
  const [email, setEmail] = useState(props.email);
  const [cpf, setCpf] = useState(props.cpf);
  const [senha, setSenha] = useState(props.senha);

  useEffect(() => {
    api8082
      .get(`/usuarios/${idUsuario}`)
      .then((response) => {
        setNome(response.nome);
        setEmail(response.email);
        setCpf(response.cpf);
        setSenha(response.senha);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    console.log(nome);
    console.log(email);
    console.log(cpf);
    console.log(senha);

    api8082
      .put(`/usuarios/${idUsuario}`, {
        nome,
        email,
        cpf,
        senha,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Alterações realizadas com sucesso!",
          showConfirmButton: true,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <NavbarPosLogin />

      <div className="container-cliente">
        <div className="cliente">
          <form onSubmit={handleSave}>
            <h1>Olá, {sessionStorage.getItem("nome")}! Suas Informações</h1>
            <div className="input-group">
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="cpf"
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <Button
                type="submit"
                id="btn-cadastrar"
                value="Salvar alterações"
                onclick={handleSave}
                />
            
          </form>
        </div>

        <div className="servicos-contratados">
          <h1>Serviços contratados</h1>
          <div className="servicos-contratados-container">
            {
                // props.servicos.map((servico) => {
                //     return (
                //         <div className="servico-contratado">
                //             <h3>{servico.nome}</h3>
                //             <p>{servico.descricao}</p>
                //             <p>{servico.preco}</p>
                //         </div>
                //     )
                // })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Cliente;
