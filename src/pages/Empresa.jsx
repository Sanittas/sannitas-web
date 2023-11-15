import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import NavbarPosLogin from "../components/NavBarPosLogin";
import "../css/empresa.modules.css";
import { South, Token } from "@mui/icons-material";
import Swal from "sweetalert2";



function Empresa(props) {

        const idEmpresa = sessionStorage.getItem("idEmpresa");
        const [razaoSocial, setRazaoSocial] = useState();
        const [cnpj, setCnpj] = useState();
        const [senha, setSenha] = useState();
        const[email, setEmail] = useState();

        
    
        useEffect(() => {
            if(sessionStorage.getItem("token") == null) {
                window.location.href = "/";
            }

            api.get(`/empresas/${idEmpresa}`).then((response) => {
                setRazaoSocial(response.data.razaoSocial);
                setCnpj(response.data.cnpj);
                setSenha(response.data.senha);
                setEmail(response.data.email);
            }).catch((err) => {
                console.log(err);
            }
            )
        })

        const modalUpdate = () => {
            Swal.fire({
                title: 'Atualizar Empresa',
                html: `
                <form>
                    <input id="razaoSocial" class="swal2-input" placeholder="Razão Social">
                    <input id="cnpj" class="swal2-input" placeholder="CNPJ">
                    <input id="senha" type="password" class="swal2-input" placeholder="Senha">
                    <input id="email" class="swal2-input" placeholder="Email">
                </form>    
                `,
                showCancelButton: true,
                confirmButtonText: 'Atualizar',
                cancelButtonText: 'Cancelar',
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    const razaoSocial = Swal.getPopup().querySelector('#razaoSocial').value
                    const cnpj = Swal.getPopup().querySelector('#cnpj').value
                    const senha = Swal.getPopup().querySelector('#senha').value
                    const email = Swal.getPopup().querySelector('#email').value
                    if (!razaoSocial || !cnpj || !senha || !email) {
                        Swal.showValidationMessage(`Preencha todos os campos`)
                    }
                    return { razaoSocial: razaoSocial, cnpj: cnpj, senha: senha, email: email }
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    updateEmpresa(result.value)
                }
            })
        }
        


        

        const updateEmpresa = (value) => {
            api.put(`/empresas/${idEmpresa}`, {
                razaoSocial: value.razaoSocial,
                cnpj: value.cnpj,
                senha: value.senha,
                email: value.email
            }, {
                Headers: {
                    Autorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Alterações realizadas com sucesso!",
                    showConfirmButton: true,
                    timer: 1500
                })

                window.location.reload();
            }).catch((e) => {
                console.log(e)
            })
            
        }

    

    return (
        <>
            <NavbarPosLogin />

            <div className="container-empresa">
                <div className="card-infos-update">
                    <div className="card-infos">
                        <h1>Informações da Empresa</h1>
                        <p>Razão Social: {razaoSocial}</p>
                        <p>CNPJ: {cnpj}</p>
                        <p>Email: {email}</p>
                        <a onClick={modalUpdate}>Atualizar</a>
                    </div>
                    </div>
                    
                    <div className="lista-funcionarios">
                        aa
                        {/* {props.funcionarios.map((funcionario) => {
                            return (
                                <div className="card-funcionario">
                                    <p>Nome: {funcionario.nome}</p>
                                    <p>CPF: {funcionario.cpf}</p>
                                    <p>Email: {funcionario.email}</p>
                                    <p>Senha: {funcionario.senha}</p>
                                </div>
                            )
                        }
                        )} */}
                    </div>
                

               
                </div>
        </>
    )

}

export default Empresa;