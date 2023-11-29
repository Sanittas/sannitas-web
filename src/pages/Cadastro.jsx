import React from "react";

import { useState } from "react";

import "../css/cadastro.css";

import Navbar from "../components/Navbar";

import cadastroImg from "../assets/senior-couple-holding-hands.jpg";

import { api8081 } from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

function cadastro() {
  const realizarCadastro = () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    api8081.post("usuarios/cadastrar/", {
        nome: nome,
        email: email,
        cpf: cpf,
        celular: telefone,
        senha: senha,
      })
      .then((res) => {
        console.log(res);

        Swal.fire({
          icon: "success",
          title: "Cadastro realizado com sucesso!",
          showConfirmButton: true,
          timer: 1500,
        });

        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao realizar cadastro!",
          showConfirmButton: true,
          timer: 1500,
        });
      });
  };

  return (
    <>
      <Navbar />

      <div className="container-cadastro">
        <div className="cadastro">
          <h1>Cadastro</h1>
          <form>
            <Input
              label="Nome"
              id="nome"
              type="text"
              placeholder="Digite seu nome"
            />
            <Input
            label="Email"
              id="email"
              type="email"
              placeholder="Digite seu email"
            />
            <Input
              label="Telefone"
              id="telefone"
              type="text"
              placeholder="Digite seu telefone"
              mask="telefone"
              max="14"
            />
            <Input
              mask="cpf"
              label="CPF"
              id="cpf"
              type="text"
              placeholder="Digite seu CPF"
              max="14"

            />
            <Input
            
              label="Senha"
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              max="20"
            />

            <Button
            type="button"
            id="btn-cadastro"
            onClick={realizarCadastro}
            value="Cadastrar"
            />
            <Link className="linkk" to={"/cadastroEmpresa"}>
              É uma empresa?
            </Link>
          </form>
        </div>

        <div className="img-cadastro">
          <img src={cadastroImg} />
        </div>
      </div>
    </>
  );
}

export default cadastro;
