import React from "react";

import { useState, useEffect } from "react";
import NavbarPosLogin from "../components/NavBarPosLogin";
import "../css/empresa.modules.css";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { api8080 } from "../api/apiToken";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";





function Empresa() {
  const idEmpresa = sessionStorage.getItem("idEmpresa");

  //variaveis para funcionarios
  const [funcionarios, setFuncionarios] = useState([]);
  const [empresas, setEmpresa] = useState();
  const [competencias, setCompetencias] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

    const getEmpresa = async () => {
      try {
        const response = await api8080.get(`/empresas/${idEmpresa}`);
        setEmpresa(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getFuncionarios = async () => {
      try {
        const response = await api8080.get(
          `/funcionarios/empresa/${idEmpresa}`
        );
        setFuncionarios(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getCompetencias = async () => {
      try {
        const response = await api8080.get(`/competencias/`);
        setCompetencias(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getEmpresa();
    getFuncionarios();
    getCompetencias();
  }, []);

  const modalUpdate = () => {
    Swal.fire({
      title: "Atualizar Empresa",
      html: `
                <form>
                    <input id="razaoSocial" class="swal2-input" placeholder="Razão Social">
                    <input id="cnpj" class="swal2-input" placeholder="CNPJ">
                    <input id="senha" type="password" class="swal2-input" placeholder="Senha">
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
        // const email = Swal.getPopup().querySelector("#email").value;
        if (!razaoSocial || !cnpj || !senha) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          razaoSocial: razaoSocial,
          cnpj: cnpj,
          senha: senha,
          // email: email,
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
    api8080
      .put(
        `/empresas/${idEmpresa}`,
        {
          razaoSocial: value.razaoSocial,
          cnpj: value.cnpj,
          senha: value.senha,
          // email: value.email,
        },
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

  const modalUpdateFuncionario = (id) => {
    Swal.fire({
      title: "Atualizar Funcionário",
      html: `
                <form>
                    <input id="nome" class="swal2-input" placeholder="Nome">
                    <input id="email" class="swal2-input" placeholder="Email">
                    <input id="cpf" class="swal2-input" placeholder="CPF">
                    <input id="rg" class="swal2-input" placeholder="RG">
                    <input id="funcional" class="swal2-input" placeholder="Número Funcional">
                    <input id="numeroRegAtuacao" class="swal2-input" placeholder="Número de Registro de Atuação">
                    <select id="idCompetencia" class="swal2-input select-competencia">
                    {
                      competencias ? competencias.map((competencia) => (
                        <option value={competencia.id}>{competencia.nome}</option>
                      )) : <option>Sem competências</option>
                    }
                    <input id="expCompetencia" class="swal2-input" placeholder="Experiência e Competência">
                    <input id="especializacao" class="swal2-input" placeholder="Especialização">
                    <input id="nivelProficiencia" class="swal2-input" placeholder="Nível de Proficiência">
                </form>    
                `,
      showCancelButton: true,
      width: "600px",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nome = Swal.getPopup().querySelector("#nome").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const cpf = Swal.getPopup().querySelector("#cpf").value;
        const rg = Swal.getPopup().querySelector("#rg").value;
        const funcional = Swal.getPopup().querySelector("#funcional").value;
        const numeroRegAtuacao = Swal.getPopup().querySelector("numeroRegAtuacao").value;
        const expCompetencia = Swal.getPopup().querySelector("#expCompetencia").value;
        const especializacao = Swal.getPopup().querySelector("#especializacao").value;
        const nivelProficiencia = Swal.getPopup().querySelector("#nivelProficiencia").value;
        if (!nome || !email || !cpf || !rg || !funcional || !numeroRegAtuacao || !expCompetencia || !especializacao || !nivelProficiencia) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          id: id,
          nome: nome,
          email: email,
          cpf: cpf,
          rg: rg,
          funcional: funcional,
          numeroRegistroAtuacao: numeroRegAtuacao,
          expCompetencia: expCompetencia,
          especializacao: especializacao,
          nivelProficiencia: nivelProficiencia,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        updateFuncionario(result.value);


        
      }
    });
  }

  const updateFuncionario = (value) => {
    api8080
      .put(
        `/funcionarios/${value.id}`,
        {
          nome: value.nome,
          email: value.email,
          cpf: value.cpf,
          rg: value.rg,
          funcional: value.funcional,
          numeroRegistroAtuacao: value.numeroRegistroAtuacao,
        },
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
  }

  const vincularFuncionarioCompetencia = (value) => {
    api8080.post( `/funcionarios/${value.id}/competencias/`, {
      idFuncionario: value.id,
      expCompetencia: value.expCompetencia,
      especializacao: value.especializacao,
      nivelProficiencia: value.nivelProficiencia,

    }).catch((e) => {
      console.log(e);
    });
  }

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
                </form>    
                `,
      width: "600px",
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
        // const senha = Swal.getPopup().querySelector("#senha").value;
        // const senhaConfirm = Swal.getPopup().querySelector("#senhaConfirm").value;
        if (!nome || !email || !cpf || !rg || !funcional || !numeroRegAtuacao) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          nome: nome,
          email: email,
          cpf: cpf,
          rg: rg,
          funcional: funcional,
          numeroRegAtuacao: numeroRegAtuacao,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        api8080
          .post(`/funcionarios/`, {
            nome: result.value.nome,
            email: result.value.email,
            cpf: result.value.cpf,
            rg: result.value.rg,
            funcional: result.value.funcional,
            numeroRegistroAtuacao: result.value.numeroRegAtuacao,
            // idEmpresa: idEmpresa
          })
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Cadastro realizado com sucesso!",
              showConfirmButton: true,
              timer: 1500,
            });

            setTimeout(() => {
              window.location.reload();
            }
            , 2000);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Erro ao realizar cadastro!",
              showConfirmButton: true,
              timer: 1500,
            });
          });
      }
    });
  };



  const deleteFuncionario = (idFuncionario) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este funcionário?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        api8080
          .delete(`/funcionarios/${idFuncionario}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Funcionário excluído com sucesso!",
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
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <NavbarPosLogin />
      <div className="container-empresa">
        <div className="card-infos-update">
          <div className="card-infos">
            <h1>Informações da Empresa</h1>
            <p>Razão Social: {empresas?.razaoSocial}</p>
            <p>CNPJ: {empresas?.cnpj}</p>
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
          <table>

            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>RG</th>
                <th>Funcional</th>
                <th>Registro de Atuação</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                funcionarios ? funcionarios.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.rg}</td>
                    <td>{funcionario.funcional}</td>
                    <td>{funcionario.numeroRegistroAtuacao}</td>
                    <td>

                      <Button type="button" class="btn-update" value={<FontAwesomeIcon icon={faPen}/>} onClick={() => modalUpdateFuncionario(funcionario.id)} />
                    </td>
                    <td>
                      <Button type="button" class="btn-delete" value={<FontAwesomeIcon icon={faTrashAlt}/>} onClick={() => deleteFuncionario(funcionario.id)} />
                    </td>
                  </tr>
                )) : <tr><td>Sem funcionários</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

}


export default Empresa;
