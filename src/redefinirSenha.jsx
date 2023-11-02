import React from "react";



import { useState } from "react";

import "./css/redefinirSenha.css";

import Navbar from "./components/Navbar"

import login from "./assets/senior-couple-holding-hands.jpg"

import api from "./api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";

function RedefinirSenha() {

    const [getEmails, setEmails] = useState([]);

    const confirmarTroca = (email) => {
        const senha = document.getElementById("novaSenha").value;
        const senhaConfirmacao = document.getElementById("senhaConfirmada").value;

        if (senha === senhaConfirmacao) {
            api.post("/redefinirSenha", {
                senha: senha

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
                title: "Senhas estão divergentes",
                showConfirmButton: true,
                timer: 1500
            })
        }

    }

    const realizarTrocaSenha = () => {
        const email = document.getElementById("email").value;


        api.post("/email", {
            email: email

        }).then((res) => {

            setEmails(res.data)

            getEmails.forEach(emailApi => {
                if (emailApi === email) {
                    <>
                        <input type="text" placeholder="Nova senha" id="novaSenha" />
                        <input type="text" placeholder="Confirme a senha" id="senhaConfirmada" />
                        <a className="btn-login" onClick={confirmarTroca}>Login</a>
                    </>
                }
            });



            Swal.fire({
                icon: "success",
                title: "Login realizado com sucesso!",
                showConfirmButton: true,
                timer: 1500
            })



        }).catch((err) => {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Usuario não encontrado",
                showConfirmButton: true,
                timer: 1500
            })
        })
    }


    return (
        <>
            <Navbar />


            <div className="container-redefinir">
                <div className="redefinir">
                        <h1>Redefinir senha</h1>
                        <input type="text" placeholder="Email Cadastrado" id="email" className="" />
                        <a className="btn-login" onClick={realizarTrocaSenha}>Confirmar Email</a>
                </div>
            </div>


        </>


    )
}

export default RedefinirSenha;
