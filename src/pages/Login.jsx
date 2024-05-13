import React from "react";

import "../css/login.css";

import { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "../components/Navbar";

import login from "../assets/senior-couple-holding-hands.jpg";

import { api8081, api8080 } from "../api/api";

import Swal from "sweetalert2";
import Modal from "react-modal";

import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const realizarLogin = () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    //MODAL
    console.log(email)
    console.log(senha)

    api8080
      .post("/login/usuario", {
        username: email,
        password: senha,
      })
      .then((res) => {
        console.log(res);

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("nome", res.data.username);
        sessionStorage.setItem("id", res.data.id);

        Swal.fire({
          icon: "success",
          title: "Login realizado com sucesso!",
          showConfirmButton: true,
          timer: 2000,
        });

        // window.location.href = "/login/logoff";
        setTimeout(() => {
          window.location.href = "/";
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
          // window.location.href = "/login";
        }, 2500);
      });
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [infoGoogle, setInfoGoogle] = useState({});
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const usuarioPorEmail = (credential) => {
    // Remove 'await' keyword here
    api8081
      .get(`/usuarios/email/${credential.email}`)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          sessionStorage.setItem("nome", res.data.nome);
          sessionStorage.setItem("id", res.data.id);

          Swal.fire({
            icon: "success",
            title: "Login realizado com sucesso!",
            showConfirmButton: true,
            timer: 2000,
          });

          setTimeout(() => {
            window.location.href = "/";
          }, 2500);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoGoogle(credential);
        openModal();
      });
  };

  function cadastrarUsuarioGoogle() {
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;

    api8081
      .post("usuarios/cadastrar/", {
        nome: infoGoogle.name,
        email: infoGoogle.email,
        cpf: cpf,
        telefone: telefone,
        senha: "12345678",
      })
      .then((res) => {
        console.log(res);

        Swal.fire({
          icon: "success",
          title: "Cadastro realizado com sucesso!",
          showConfirmButton: true,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao realizar cadastro!",
          showConfirmButton: true,
          timer: 1500,
        });

        // setTimeout(() => {
        //   window.location.href = "/cadastro";
        // }, 2500);
      });
  }

  return (
    <>
      <Navbar />

      <div className="container-login">
        <div className="login">
          <h1>Login</h1>
          <form>
            <Input label="Email" type="email" placeholder="Email" id="email" />
            <Input
              label="Senha"
              type="password"
              placeholder="Senha"
              id="senha"
            />
            <Link className="redefSenha" to="/redefinirSenha">
              Esqueceu sua senha?
            </Link>
            <Button
              type="button"
              id="btn-login"
              value="Login"
              onClick={realizarLogin}
              class="btn-login"
            />
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Finalizar cadastro"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                },
                content: {
                  color: "black",
                  top: "50%",
                  left: "50%",
                  right: "auto",
                  bottom: "auto",
                  marginRight: "-50%",
                  transform: "translate(-50%, -50%)",
                  height: "40%",
                  width: "30%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                },
              }}
            >
              <h1>Finalizar cadastro</h1>
              <Input label="CPF" type="text" placeholder="CPF" id="cpf" />
              <Input
                label="Telefone"
                type="text"
                placeholder="Telefone"
                id="telefone"
              />
              <Button
                type="button"
                id="btn-finalizar"
                value="Finalizar"
                onClick={cadastrarUsuarioGoogle}
              />
            </Modal>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credentialDecoded = jwtDecode(
                  credentialResponse.credential
                );
                usuarioPorEmail(credentialDecoded);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />

            <Link className="loginEmpresa" to="/loginEmpresa">
              É uma empresa?
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

export default Login;
