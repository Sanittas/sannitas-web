import React from "react";

import "../css/login.css";

import Navbar from "../components/Navbar";

import login from "../assets/senior-couple-holding-hands.jpg";

import { api8080 } from "../api/api";

import Swal from "sweetalert2";

import { Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

function LoginEmpresa() {
  const realizarLogin = () => {
    const cnpj = document.getElementById("cnpj").value;
    const senha = document.getElementById("senha").value;
    api8080
      .post("/empresas/login", {
        cnpj: cnpj,
        senha: senha,
      })
      .then((res) => {
        console.log(res);

        sessionStorage.setItem("razaoSocial", res.data.razaoSocial);
        sessionStorage.setItem("idEmpresa", res.data.id);

        Swal.fire({
          icon: "success",
          title: "Login realizado com sucesso!",
          showConfirmButton: true,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.href = `/empresa/${res.data.id}`;
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao realizar login!",
          showConfirmButton: true,
          timer: 2000,
        });

        setTimeout(() => {
          window.location.href = "/loginEmpresa";
        }, 2500);
      });
  };

  return (
    <>
      <Navbar />

      <div className="container-login">
        <div className="login">
          <h1>Login</h1>
          <form>
            <Input
              label="CNPJ"
              id="cnpj"
              type="text"
              placeholder="CNPJ"
              mask="cnpj"
              max="18"
            />

            <Input
              label="Senha"
              id="senha"
              type="password"
              placeholder="Senha"
            />
            <Link className="redefSenha" to="/redefinirSenha">
              Esqueceu sua senha?
            </Link>
            <Button
              type="button"
              id="btn-login"
              value="Login"
              onClick={realizarLogin}
            />
            <Link className="loginEmpresa" to="/login">
              É um Cliente?
            </Link>
          </form>
        </div>

        <div className="img-login">
          <img src={login} />
        </div>
      </div>
    </>
  );
}

export default LoginEmpresa;
