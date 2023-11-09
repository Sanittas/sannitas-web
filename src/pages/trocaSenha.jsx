import React from "react";

import { useState } from "react";

import "../css/trocaSenha.css";

import Navbar from "../components/Navbar"


import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function TrocaSenha() {

    const token = useParams("token");

    useEffect(() => {
        
        api.get((`/usuarios/validarToken/${token}`)).then((response) => {
            console.log("ALOUUUUUUUUU");
        }).catch(() => {
            
            Swal.fire({
                icon: "error",
                title: "Token expirado!",
                showConfirmButton: true,
                timer: 2000
            })

            window.location.href = "/home"
        })

    }, [])

    const confirmarTroca = (email) => {
        const senha = document.getElementById("novaSenha").value;
        const senhaConfirmacao = document.getElementById("senhaConfirmada").value;
    
        if (senha >= 8 && senha.match(/[a-zA-Z0-9!@#$%^&*()_+-={}|;:<>,.?]/) && senha != null) {
            if (senha === senhaConfirmacao) {
                api.post(`/usuarios/alterar-senha`, {
                    token: token,
                    novaSenha: senha
        
                }).then((res) => {
                    console.log(res);
        
                    Swal.fire({
                        icon: "success",
                        title: "Senha atualizada",
                        showConfirmButton: true,
                        timer: 1500
                    })
        
                    window.location.href = "/login";
        
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao tentar cadastrar nova senha",
                        showConfirmButton: true,
                        timer: 1500
                    })
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "A senha não coincide com a confirmação",
                    showConfirmButton: true,
                    timer: 1500
                })
            }
            
        } else {
            Swal.fire({
                icon: "error",
                title: "Senha inválida, verifique o tamanho e se possui letras Maiusculas e minusculas",
                showConfirmButton: true,
                timer: 1500
            })
        }
    
    }


return (
    <>
        <Navbar />

        <div className="container-troca">
            <div className="troca">
                <h1>Insira a nova senha</h1>
                <input type="text" placeholder="nova senha" id="senhaNova" className="" />
                <input type="text" placeholder="Confirme a senha" id="senhaConfirmada" className="" />
                <a className="btn-login" onClick={confirmarTroca}>Atualizar Senha</a>
            </div>
        </div>


    </>


)
}


export default TrocaSenha;




