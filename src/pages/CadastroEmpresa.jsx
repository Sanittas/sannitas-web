import React from "react";

import { useState } from "react";

import "../css/cadastroEmpresa.css";

import Navbar from "../components/Navbar"

import cadastroImg from "../assets/hospital.jpg"

import { apiUsuarios, apiEmpresas, apiAuth } from "../api/api";

import Swal from "sweetalert2";

import {Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";



function cadastroEmpresa() {

    
    const realizarCadastro = () => {
        const razaoSocial = document.getElementById("razaoSocial").value;
        const cnpj = document.getElementById("cnpj").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        
        apiAuth.post("/cadastrar/empresa/", {
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

            // window.location.href = "/cadastroEmpresa";
        })
    }


    return (
        <>
        <Navbar />

        <div className="container-cadastroEmpresa">
            <div className="cadastroEmpresa">
                <h1>Cadastro</h1>
                <p>Empresa</p>
                <form>
                    <Input label="Razão Social" type="text" placeholder="Razão Social" id="razaoSocial" />
                    <Input label="CNPJ" type="text" placeholder="CNPJ" id="cnpj" mask="cnpj" max="18"/>
                    <Input label="Email" type="email" placeholder="Email" id="email" />
                    <Input label="Senha" type="password" placeholder="Senha" id="senha" max="20" />
                    <Button
                        type="button"
                        id="btn-cadastro"
                        value="Cadastrar"
                        onClick={realizarCadastro}
                    />
                    
                <Link className="linkk" to={"/cadastro"}>É uma pessoa fisíca?</Link>
                </form>
                
            </div>

            <div className="img-cadastroEmpresa">
                <img src={cadastroImg} />
                </div>
        </div>
        </>
    )
}

export default cadastroEmpresa;