import React from "react";
import "../css/redefinirSenha.css";
import Navbar from "../components/Navbar";
import api from "../api/api";
import Swal from "sweetalert2";
import Input from "../components/Input";

function RedefinirSenha() {
    const enviarEmail = () => {
        const email = document.getElementById("email").value;
        const div1 = document.querySelector("#referenciar"); // seletor corrigido
        const div2 = document.querySelector("#confirmacao"); // seletor corrigido

        if (email != null && email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            api
                .post(`/usuarios/esqueci-senha?email=${email}`, {
                    email: email,
                })
                .then((res) => {})
                .catch((err) => {})
                .finally(() => {
                    if (div1 && div2) {
                        div1.style.display = "none";
                        div2.style.display = "flex";
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Insira um email válido",
                showConfirmButton: true,
                timer: 1500,
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="container-redefinir">
                <div className="redefinir" id="referenciar">
                    <h1>Redefinir senha</h1>
                    <p>Insira seu email para redefinir sua senha</p>
                    <Input type="email" placeholder="Email" id="email" />
                    <a className="btn-login" onClick={enviarEmail}>
                        Confirmar Email
                    </a>
                </div>
                <div className="confirmacao" id="confirmacao" style={{ display: "none" }}>
                    <h1>Email Enviado!</h1>
                    <p>Cheque sua caixa de entrada do email ou área de spam.</p>
                </div>
            </div>
        </>
    );
}


export default RedefinirSenha;
