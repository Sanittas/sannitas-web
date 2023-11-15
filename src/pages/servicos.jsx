import React from "react";

import { useState } from "react";

import "../css/cliente.css";

import api from "../api/api";

import Swal from "sweetalert2";

import { Outlet, Link, useLocation, useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import { useEffect } from "react";


function servicos (props) {

    const idUsuario = useParams("idUsuario");

    const [tituloServico, setTituloServico] = useState();
    const [descricao, setDescricao] = useState();
    const [areaSaude, setAreaSaude] = useState();
    const [valorServico, setValorServico] = useState();
    const [tempoServico, setTempoServico] = useState();

    useEffect(() => {
        
        api.get((`/servicos/`)).then((response) => {
            setTituloServico(response.nome)
            setDescricao(response.email)
            setAreaSaude(response.cpf)
            setValorServico(response.senha)
            setTempoServico(response.senha)
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
            
            
            
            </>
        )
}



export default servicos;