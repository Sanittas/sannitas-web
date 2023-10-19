import React from "react";

import { useState } from "react";

import "./css/login.css";

import Navbar from "./components/Navbar"

import login from "./assets/senior-couple-holding-hands.jpg"

import api from "./api";



function Login() {


    
    const realizarLogin = () => {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        api.post("/login", {
            email: email,
            senha: senha
            
        }).then((res) => {
            console.log(res);
            
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("nome", res.data.nome);
            
            window.location.href = "/login/logoff";
            
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
        <Navbar />

        <div className="container-login">
            <div className="login">
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Email" id="email" />
                    <input type="password" placeholder="Senha" id="senha"/>
                    <span><a href="#">Esqueceu sua Senha?</a></span>
                    <a className="btn-login" onClick={realizarLogin}>Login</a>
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