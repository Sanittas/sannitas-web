import React from "react";

import { useState } from "react";

import "../css/cliente.css";

import Navbar from "../components/Navbar"

import cadastroImg from "../assets/hospital.jpg"

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";

// Chamar essa página passando o OBJETO do usuário


function Cliente (props) {
    const [id, setId] = useState(props.id);
    const [nome, setNome] = useState(props.nome);
    const [email, setEmail] = useState(props.email);
    const [cpf, setCpf] = useState(props.cpf);
    const [senha, setSenha] = useState(props.senha);
    
    const handleSave = () => {
        

        api.put(`/usuarios/${id}`, {
                nome,
                email,
                cpf,
                senha
            
        }).then(() => {

            Swal.fire({
                icon: "success",
                title: "Alterações realizadas com sucesso!",
                showConfirmButton: true,
                timer: 1500
            })
        });
    };
    
    
        return (
            <>
            <NavbarPosLogin />
    
            <div className="container-cliente">
                <div className="cliente">
                    <form>
                    <h1>Olá, {props.nome} !</h1>
                    {/*<p>Nome: <input class="input-music-enable" type="text" value={nome} onChange={(e) => setNome(e.target.value)}/> <p/>
                    <input class="input-music-enable" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input class="input-music-enable" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    <input class="input-music-enable" type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/> */}
                    <p>Nome:</p>
                    <input class="input-music-enable" type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    <p>Email:</p>
                    <input class="input-music-enable" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p>CPF:</p>
                    <input class="input-music-enable" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    <p>Senha:</p>
                    <input class="input-music-enable" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}/>
    
                        <a className="btn-cliente" onClick={handleSave}>salvar</a>
                    </form>
                </div>
            </div>
            </>
        )
}



export default Cliente;