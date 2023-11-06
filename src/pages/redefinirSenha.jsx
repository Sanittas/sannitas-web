import React from "react";



import { useState } from "react";

import "../css/redefinirSenha.css";

import Navbar from "../components/Navbar"

import login from "../assets/senior-couple-holding-hands.jpg"

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";

function RedefinirSenha() {

    const enviarEmail = () => {
        const email = document.getElementById("email").value;

        if (email != null && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            api.post("/email", {
                email: email
    
            }).then((res) => {
    
            }).catch((err) => {
    
            }).finally(() => {
                Swal.fire({
                    icon: "success",
                    title: "Email enviado!",
                    showConfirmButton: true,
                    timer: 1500
                })
    
                window.location.href = "/trocaSenha"
            }
    
            )
        } else {
            Swal.fire({
                icon: "error",
                title: "Insira um email válido",
                showConfirmButton: true,
                timer: 1500
            })
        }
        
    }


return (
    <>
        <Navbar />


        <div className="container-redefinir">
            <div className="redefinir">
                <h1>Redefinir senha</h1>
                <input type="text" placeholder="Email Cadastrado" id="email" className="" />
                <a className="btn-login" onClick={enviarEmail}>Confirmar Email</a>
            </div>
        </div>


    </>


)
}


export default RedefinirSenha;
