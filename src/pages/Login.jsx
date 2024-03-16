import React from "react";

import { useState } from "react";

import "../css/login.css";

import Navbar from "../components/Navbar"

import login from "../assets/senior-couple-holding-hands.jpg"

import {api8081, api} from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";

import Input from "../components/Input";
import Button from "../components/Button";





function Login() {


    
    const realizarLogin = () => {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        

        api8081.post("/usuarios/login", {
            email: email,
            senha: senha
            
        }).then((res) => {
            console.log(res);
            
            sessionStorage.setItem("nome", res.data.nome);
            sessionStorage.setItem("id", res.data.userId);

            Swal.fire({
                icon: "success",
                title: "Login realizado com sucesso!",
                showConfirmButton: true,
                timer: 1500
            })
            
            // window.location.href = "/login/logoff";
            window.location.href = "/";
            
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Erro ao realizar login!",
                showConfirmButton: true,
                timer: 1500
            })
        })
        

    }


    return (
        <>
        <Navbar />

        <div className="container-login">
            <div className="login">
                <h1>Login</h1>
                <form>
                    <Input 
                    label="Email"
                    type="email"
                    placeholder="Email"
                    id="email"
                    />
                    <Input
                    label="Senha"
                    type="password"
                    placeholder="Senha"
                    id="senha"
                    />
                    <Link className="redefSenha" to="/redefinirSenha">Esqueceu sua senha?</Link>
                    <Button
                    type="button"
                    id="btn-login"
                    value="Login"
                    onClick={realizarLogin}
                    />
                    <Link className="loginEmpresa" to="/loginEmpresa">É uma empresa?</Link>
                </form>
            </div>

            <div className="img-login">
                <img src={login} />
                </div>
        </div>
        </>
    )
}

export default Login;