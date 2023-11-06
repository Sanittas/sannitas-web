import React from "react";

import { useState } from "react";

import "../css/cadastro.css";

import Navbar from "../components/Navbar"

import cadastroImg from "../assets/senior-couple-holding-hands.jpg"

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";



function cadastro() {


    
    const realizarCadastro = () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const cpf = document.getElementById("cpf").value;
        const senha = document.getElementById("senha").value;

        api.post("usuarios/cadastrar/", {
            nome: nome,
            email: email,
            cpf: cpf,
            celular: telefone,
            senha: senha
            
            
        }).then((res) => {
            console.log(res);

            Swal.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!",
                showConfirmButton: true,
                timer: 1500
            })
            
            window.location.href = "/cadastro";
            
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Erro ao realizar cadastro!",
                showConfirmButton: true,
                timer: 1500
            })
        })
    }


    return (
        <>
        <Navbar />

        <div className="container-cadastro">
            <div className="cadastro">
                <h1>Cadastro</h1>
                <form>
                    <input type="text" placeholder="nome" id="nome" />
                    <input type="text" placeholder="Email" id="email" />
                    <input type="text" placeholder="telefone" id="telefone" />
                    <input type="text" placeholder="CPF" id="cpf" />
                    <input type="password" placeholder="Senha" id="senha"/>
                    <a className="btn-cadastro" onClick={realizarCadastro}>Cadastrar</a>
                    <Link className="link" to={"/cadastroEmpresa"}>É uma empresa?</Link>
                    
                    
                </form>
            </div>

            <div className="img-cadastro">
                <img src={cadastroImg} />
                </div>
                
        </div>
        </>
    )
}

export default cadastro;