import React from "react";

import { useState } from "react";

import "../css/cliente.css";

import Navbar from "../components/Navbar"

import cadastroImg from "../assets/hospital.jpg"

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import { useEffect } from "react";

// Chamar essa página passando o OBJETO do usuário


function Cliente (props) {

    const idUsuario = useParams("idUsuario");
    
    const [nome, setNome] = useState(props.nome);
    const [email, setEmail] = useState(props.email);
    const [cpf, setCpf] = useState(props.cpf);
    const [senha, setSenha] = useState(props.senha);
    

    useEffect(() => {
        
        api.get((`/${idUsuario}`)).then((response) => {
            setNome(response.nome)
            setEmail(response.email)
            setCpf(response.cpf)
            setSenha(response.senha)
        }).catch(() => {
            console.log("deu erro")
        })

    }, [])

    const handleSave = (e) => {
        e.preventDefault();

        console.log(nome);
        console.log(email);
        console.log(cpf);
        console.log(senha);

        api.put(`/usuarios/${idUsuario}`, {
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
                    <form onSubmit={handleSave}>
                    <h1>Olá, {props.nome} !</h1>
                    
                    <p>Nome:</p>
                    <input class="input-music-enable" type="text" defaultValue={nome} onChange={(e) => setNome(e.target.value)}/>
                    <p>Email:</p>
                    <input class="input-music-enable" type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                    <p>CPF:</p>
                    <input class="input-music-enable" type="text" defaultValue={cpf} onChange={(e) => setCpf(e.target.value)}/>
                    <p>Senha:</p>
                    <input class="input-music-enable" type="password" defaultValue={senha} onChange={(e) => setSenha(e.target.value)}/>
                    <button type="submit" className="btn-cliente" onClick={handleSave}>salvar</button>
                    </form>
                </div>
            </div>
            </>
        )
}



export default Cliente;