import React from "react";

import { useState } from "react";

import "../css/cadastroEmpresa.css";

import Navbar from "../components/Navbar"

import cadastroImg from "../assets/hospital.jpg"

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";



function cadastroEmpresa() {


    
    const realizarCadastro = () => {
        const razaoSocial = document.getElementById("razaoSocial").value;
        const cnpj = document.getElementById("cnpj").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        
        api.post("empresas/cadastrar/", {
            razaoSocial: razaoSocial,
            cnpj: cnpj,
            senha: senha,
            email: email
        }).then((res) => {
            console.log(res);

            Swal.fire({
                icon: "success",
                title: "Cadastro realizado com sucesso!",
                showConfirmButton: true,
                timer: 1500
            })
            
            window.location.href = "/loginEmpresa";
            
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
                    <Input label="Razão Social" type="text" placeholder="Razão Social" id="razaoSocial" />
                    <Input label="CNPJ" type="text" placeholder="CNPJ" id="cnpj" />
                    <Input label="Email" type="email" placeholder="Email" id="email" />
                    <Input label="Senha" type="password" placeholder="Senha" id="senha" />
                    <Button
                        type="button"
                        id="btn-cadastro"
                        value="Cadastrar"
                        onClick={realizarCadastro}
                    />
                    
                <Link className="link"to={"/cadastro"}>É uma pessoa fisíca?</Link>
                </form>
                
            </div>

            <div className="img-cadastro">
                <img src={cadastroImg} />
                </div>
        </div>
        </>
    )
}

export default cadastroEmpresa;