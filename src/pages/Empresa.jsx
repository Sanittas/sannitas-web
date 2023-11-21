import React from "react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import "../css/empresa.modules.css";
import Swal from "sweetalert2";
import Button from "../components/Button";
import apiToken from "../api/apiToken";

function Empresa(props) {
  const idEmpresa = sessionStorage.getItem("idEmpresa");
  const [razaoSocial, setRazaoSocial] = useState();
  const [cnpj, setCnpj] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

    apiToken
      .get(`/empresas/${idEmpresa}`)
      .then((response) => {
        setRazaoSocial(response.data.razaoSocial);
        setCnpj(response.data.cnpj);
        setEmail(response.data.email);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const modalUpdate = () => {
    Swal.fire({
      title: "Atualizar Empresa",
      html: `
                <form>
                    <input id="razaoSocial" class="swal2-input" placeholder="Razão Social">
                    <input id="cnpj" class="swal2-input" placeholder="CNPJ">
                    <input id="senha" type="password" class="swal2-input" placeholder="Senha">
                    <input id="email" class="swal2-input" placeholder="Email">
                </form>    
                `,
      showCancelButton: true,
      width: "600px",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const razaoSocial = Swal.getPopup().querySelector("#razaoSocial").value;
        const cnpj = Swal.getPopup().querySelector("#cnpj").value;
        const senha = Swal.getPopup().querySelector("#senha").value;
        const email = Swal.getPopup().querySelector("#email").value;
        if (!razaoSocial || !cnpj || !senha || !email) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          razaoSocial: razaoSocial,
          cnpj: cnpj,
          senha: senha,
          email: email,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        updateEmpresa(result.value);
      }
    });
  };

  const updateEmpresa = (value) => {
    apiToken
      .put(
        `/empresas/${idEmpresa}`,
        {
          razaoSocial: value.razaoSocial,
          cnpj: value.cnpj,
          senha: value.senha,
          email: value.email,
        },
        {
          Headers: {
            Autorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Alterações realizadas com sucesso!",
          showConfirmButton: true,
          timer: 1500,
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });

      
  };

  const cadastrarFuncionario = () => {
    Swal.fire({
      title: "Cadastrar Funcionário",
      html: `
                <form width="400px">
                    <input id="nome" class="swal2-input" type="text" placeholder="Digite seu Nome"/>
                    <input id="email" class="swal2-input" type="email" placeholder="Digite seu Email"/>
                    <input id="cpf" class="swal2-input" type="text" placeholder="Digite seu CPF"/>
                    <input id="rg" class="swal2-input" type="text" placeholder="Digite seu RG"/>
                    <input id="funcional" type="text" class="swal2-input" placeholder="Digite seu Número Funcional"/>
                    <input id="numeroRegAtuacao" class="swal2-input" type="text" placeholder="Digite seu Número de Registro de Atuação"/>
                    <input id="senha" class="swal2-input" type="password"  placeholder="Digite sua Senha"/>
                    <input id="senhaConfirm" class="swal2-input" type="password" placeholder="Confirme sua Senha"/>
                </form>    
                `,
                width: '600px',
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nome = Swal.getPopup().querySelector("#nome").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const cpf = Swal.getPopup().querySelector("#cpf").value;
        const rg = Swal.getPopup().querySelector("#rg").value;
        const funcional = Swal.getPopup().querySelector("#funcional").value;
        const numeroRegAtuacao = Swal.getPopup().querySelector("#numeroRegAtuacao").value;
        const senha = Swal.getPopup().querySelector("#senha").value;
        const senhaConfirm = Swal.getPopup().querySelector("#senhaConfirm").value;
        if (!nome || !email || !cpf || !rg || !funcional || !numeroRegAtuacao || !senha || !senhaConfirm) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }else if(senha != senhaConfirm){
          Swal.showValidationMessage(`Senhas não conferem`);
        }
        return {
          nome: nome,
          email: email,
          cpf: cpf,
          rg: rg,
          funcional: funcional,
          numeroRegAtuacao: numeroRegAtuacao,
          senha: senha,
          senhaConfirm: senhaConfirm
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        apiToken.post(`/funcionarios/`, {
          nome: result.value.nome,
          email: result.value.email,
          cpf: result.value.cpf,
          rg: result.value.rg,
          funcional: result.value.funcional,
          numeroRegAtuacao: result.value.numeroRegAtuacao,
          senha: result.value.senha,
          senhaConfirm: result.value.senhaConfirm,
          idEmpresa: idEmpresa
        }).then((res) => {
          Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: true,
            timer: 1500,
          });
        }).catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Erro ao realizar cadastro!",
            showConfirmButton: true,
            timer: 1500,
          });
        })
      }
    });



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
            <Button
              type="button"
              id="btn-update"
              value="Atualizar"
              onClick={modalUpdate}
            />
          </div>
        </div>

        <div className="card-infos-funcionarios">
          <div className="card-infos">
            <h1>Funcionários</h1>
            <p>Quantidade de Funcionários: 0</p>
            <Button
              type="button"
              id="btn-update"
              value="Cadastrar"
              onClick={cadastrarFuncionario}
            />
          </div>
        </div>

        <div className="card-read-funcionarios">
            <ul>
                {
                }
            </ul>
        </div>
      </div>
    </>
  );
}

export default Empresa;
