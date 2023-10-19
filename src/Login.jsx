import React from "react";

import "./css/login.css";

import Navbar from "./components/Navbar"

import login from "./assets/senior-couple-holding-hands.jpg"

function Login() {
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
                    <button type="submit" className="btn-login" >Entrar</button>
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