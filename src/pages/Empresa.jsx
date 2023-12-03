import React from "react";

import { useState, useEffect, useRef } from "react";
import NavbarPosLogin from "../components/NavBarPosLogin";
import "../css/empresa.modules.css";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { api8080 } from "../api/apiToken";
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";
import mascara from "../api/mascara";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  LocalConvenienceStoreOutlined,
  SetMealSharp,
} from "@mui/icons-material";

function Empresa() {
  const idEmpresa = sessionStorage.getItem("idEmpresa");

  //variaveis para funcionarios
  const [countFuncionarios, setCountFuncionarios] = useState(0);
  const [funcionarios, setFuncionarios] = useState([]);
  const [empresas, setEmpresa] = useState();
  const [competencias, setCompetencias] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  var [idFuncionario, setIdFuncionario] = useState();

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
    };

    const getEnderecos = async () => {
      try {
        const response = await api8080.get(`/enderecos/empresas/${idEmpresa}`);
        setEnderecos(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    const getCountFuncionarios = async () => {
      try {
        const response = await api8080.get(
          `/funcionarios/count-empresa/`,
        );
        setCountFuncionarios(response.data); 
      } catch (err) {
        console.log(err);
      }
    }

    getEmpresa();
    getFuncionarios();
    getCompetencias();
    getEnderecos();
    getCountFuncionarios();
  }, []);

  const modalUpdate = () => {
    Swal.fire({
      title: "Atualizar Empresa",
      html: `
                <form>
                    <input id="razaoSocial" class="swal2-input" placeholder="Razão Social">
                    <input id="cnpj" class="swal2-input" placeholder"CNPJ" value=${empresas?.cnpj} disabled>
                    <input id="email" class="swal2-input" placeholder="Email" type="email">
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
        const email = Swal.getPopup().querySelector("#email").value;
        if (!razaoSocial || !senha || !email || !cnpj) {
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
    api8080
      .put(`/empresas/${idEmpresa}`, {
        razaoSocial: value.razaoSocial,
        cnpj: value.cnpj,
        senha: value.senha,
        email: value.email,
      })
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
      title: "Atualzar Funcionário",
      html: `
      <form>
      <input id="nome" class="swal2-input" placeholder="Nome">
      <input id="email" class="swal2-input" placeholder="Email" type="email">
      <input id="cpf" class="swal2-input" placeholder="CPF" value=${
        funcionarios?.find((funcionario) => funcionario.id === id).cpf
      } disabled>
      <input id="rg" class="swal2-input" placeholder="RG" value=${
        funcionarios?.find((funcionario) => funcionario.id === id).rg
      } disabled>
      <input id="funcional" class="swal2-input" placeholder="Número Funcional" type="number">
      <input id="numeroRegAtuacao" class="swal2-input" placeholder="Número de Registro de Atuação" type="number">
      <select id="idCompetencia" class="swal2-input select-competencia" type="number">
      ${
        competencias
          ? competencias.map(
              (competencia) =>
                `<option value=${competencia.id}>${competencia.descricao}</option>`
            )
          : `<option>Sem competências</option>`
      }
      
      </select>
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
        const numeroRegAtuacao =
          Swal.getPopup().querySelector("#numeroRegAtuacao").value;
        const idCompetencia =
          Swal.getPopup().querySelector("#idCompetencia").value;
        const expCompetencia =
          Swal.getPopup().querySelector("#expCompetencia").value;
        const especializacao =
          Swal.getPopup().querySelector("#especializacao").value;
        const nivelProficiencia =
          Swal.getPopup().querySelector("#nivelProficiencia").value;
        if (
          !nome ||
          !email ||
          !cpf ||
          !rg ||
          !funcional ||
          !numeroRegAtuacao ||
          !expCompetencia ||
          !especializacao ||
          !nivelProficiencia ||
          !idCompetencia
        ) {
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
          idCompetencia: idCompetencia,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        updateFuncionario(result.value);
        updateFuncionarioCompetencia(result.value);
      }
    });
  };

  const updateFuncionario = (value) => {
    api8080
      .put(`/funcionarios/${value.id}`, {
        nome: value.nome,
        email: value.email,
        cpf: value.cpf,
        rg: value.rg,
        funcional: value.funcional,
        numeroRegistroAtuacao: value.numeroRegistroAtuacao,
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Alterações realizadas com sucesso!",
          showConfirmButton: true,
          timer: 1500,
        });

        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  async function getIdFuncionario(cpf) {
    let response = await api8080.get(`/funcionarios/cpf/${cpf}`);
    let data = response.data;
    return data;
  }

  async function getIdFuncionarioCompetencia(idFuncionario) {
    let response = await api8080.get(
      `/funcionarios-competencias/${idFuncionario}`
    );
    let data = response.data;
    console.log(data);
    return data[0].id;
  }

  const updateFuncionarioCompetencia = async (value) => {
    api8080
      .put(
        `/funcionarios-competencias/${await getIdFuncionarioCompetencia(
          value.id
        )}`,
        {
          experiencia: value.expCompetencia,
          especializacao: value.especializacao,
          nivel_proficiencia: value.nivelProficiencia,
          fk_competencia: value.idCompetencia,
          fk_funcionario: value.id,
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

  const vincularFuncionarioCompetencia = async (value) => {
    await api8080
      .post(`/funcionarios-competencias/`, {
        experiencia: value.expCompetencia,
        especializacao: value.especializacao,
        nivel_proficiencia: value.nivelProficiencia,
        fk_competencia: value.idCompetencia,
        fk_funcionario: await getIdFuncionario(value.cpf),
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cadastrarFuncionario = async () => {
    Swal.fire({
      title: "Cadastrar Funcionário",
      html: `
      <form>
      <input id="nome" class="swal2-input" placeholder="Nome">
      <input id="email" class="swal2-input" placeholder="Email" type="email">
      <input id="cpf" class="swal2-input" placeholder="CPF" maxLength="14">
      <input id="rg" class="swal2-input" placeholder="RG" maxLength="12">
      <input id="funcional" class="swal2-input" placeholder="Número Funcional" type="number">
      <input id="numeroRegAtuacao" class="swal2-input" placeholder="Número de Registro de Atuação" type="number">
      <select id="idCompetencia" class="swal2-input select-competencia" type="number">
      ${
        competencias ? (
          competencias.map(
            (competencia) =>
              `<option value=${competencia.id}>${competencia.descricao}</option>`
          )
        ) : (
          <option>Sem competências</option>
        )
      }

      
      </select>
      <input id="expCompetencia" class="swal2-input" placeholder="Experiência e Competência">
      <input id="especializacao" class="swal2-input" placeholder="Especialização">
      <input id="nivelProficiencia" class="swal2-input" placeholder="Nível de Proficiência">
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
        const numeroRegAtuacao =
          Swal.getPopup().querySelector("#numeroRegAtuacao").value;
        const idCompetencia =
          Swal.getPopup().querySelector("#idCompetencia").value;
        const expCompetencia =
          Swal.getPopup().querySelector("#expCompetencia").value;
        const especializacao =
          Swal.getPopup().querySelector("#especializacao").value;
        const nivelProficiencia =
          Swal.getPopup().querySelector("#nivelProficiencia").value;
        // const senha = Swal.getPopup().querySelector("#senha").value;
        // const senhaConfirm = Swal.getPopup().querySelector("#senhaConfirm").value;
        if (
          !nome ||
          !email ||
          !cpf ||
          !rg ||
          !funcional ||
          !numeroRegAtuacao ||
          !idCompetencia ||
          !expCompetencia ||
          !especializacao ||
          !nivelProficiencia
        ) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          nome: nome,
          email: email,
          cpf: cpf,
          rg: rg,
          funcional: funcional,
          numeroRegAtuacao: numeroRegAtuacao,
          idCompetencia: idCompetencia,
          expCompetencia: expCompetencia,
          especializacao: especializacao,
          nivelProficiencia: nivelProficiencia,
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

            vincularFuncionarioCompetencia(result.value);

            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
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
          .get(`/funcionarios-competencias/${idFuncionario}`)
          .then((res) => {
            console.log(res.data);
            res.data.map((funcionarioCompetencia) => {
              api8080.delete(
                `/funcionarios-competencias/${funcionarioCompetencia.id}`
              );
            });
          })
          .then(() => {
            api8080.delete(`/funcionarios/${idFuncionario}`);
          })
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
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Erro ao excluir funcionário!",
              showConfirmButton: true,
              timer: 1500,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleBotaoClick = () => {
    mostrarModal ? setMostrarModal(false) : setMostrarModal(true) 
  };

  const updateEndereco = (idEndereco) => {
    console.log(enderecos?.find((endereco) => endereco.id === idEndereco).logradouro);
    Swal.fire({
      title: "Atualizar Endereço",
      html: `
      <form>
      <input id="logradouro" class="swal2-input" placeholder="Logradouro" value="${enderecos?.find((endereco) => endereco.id === idEndereco).logradouro}"/>
      <input id="numero" class="swal2-input" placeholder="Número" value="${
        enderecos?.find((endereco) => endereco.id === idEndereco).numero
      }">
      <input id="complemento" class="swal2-input" placeholder="Complemento" value="${
        enderecos?.find((endereco) => endereco.id === idEndereco).complemento
      }">
      <input id="cidade" class="swal2-input" placeholder="Cidade" value="${
        enderecos?.find((endereco) => endereco.id === idEndereco).cidade
      }">
      <input id="estado" class="swal2-input" placeholder="Estado" value="${
        enderecos?.find((endereco) => endereco.id === idEndereco).estado
      }">
      
  </form>    
                `,
      showCancelButton: true,
      width: "600px",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const logradouro = Swal.getPopup().querySelector("#logradouro").value;
        const numero = Swal.getPopup().querySelector("#numero").value;
        const complemento = Swal.getPopup().querySelector("#complemento").value;
        const cidade = Swal.getPopup().querySelector("#cidade").value;
        const estado = Swal.getPopup().querySelector("#estado").value;
        if (
          !logradouro ||
          !numero ||
          !complemento ||
          !cidade ||
          !estado
        ) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          logradouro: logradouro,
          numero: numero,
          complemento: complemento,
          cidade: cidade,
          estado: estado,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        api8080.put(`/enderecos/empresas/${idEndereco}`, {
          logradouro: result.value.logradouro,
          numero: result.value.numero,
          complemento: result.value.complemento,
          cidade: result.value.cidade,
          estado: result.value.estado,
        }).then(() => {
          Swal.fire({
            icon: "success",
            title: "Alterações realizadas com sucesso!",
            showConfirmButton: true,
            timer: 1500,
          });
  
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }).catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Erro ao realizar alterações!",
            showConfirmButton: true,
            timer: 1500,
          });
        })
      }
    },
    );
  };

  const deleteEndereco = (idEndereco) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este endereço?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        api8080.delete(`/enderecos/empresas/${idEndereco}`)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Endereço excluído com sucesso!",
            showConfirmButton: true,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Erro ao excluir endereço!",
            showConfirmButton: true,
            timer: 1500,
          });
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  }

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

            <Button
              type="button"
              id="btn-update"
              value="Cadastrar Endereço"
              onClick={handleBotaoClick}
            />

            {mostrarModal ? (
              <>
                <ModalCadastroEndereco />
              
              </>
            ) : null}
          </div>
        </div>

        <div className="card-infos-funcionarios">
          <div className="card-infos">
            <h1>Funcionários</h1>
            <p>Quantidade de Funcionários: {countFuncionarios}</p>
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
                <th>Atualizar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios ? (
                funcionarios.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.nome}</td>
                    <td>{funcionario.email}</td>
                    <td>{funcionario.cpf}</td>
                    <td>{funcionario.rg}</td>
                    <td>{funcionario.funcional}</td>
                    <td>{funcionario.numeroRegistroAtuacao}</td>
                    <td>
                      <Button
                        type="button"
                        class="btn-update"
                        value={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => modalUpdateFuncionario(funcionario.id)}
                      />
                    </td>
                    <td>
                      <Button
                        type="button"
                        class="btn-delete"
                        value={<FontAwesomeIcon icon={faTrashAlt} />}
                        onClick={() => deleteFuncionario(funcionario.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Sem funcionários</td>
                </tr>
              )}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Logradouro</th>
                <th>Número</th>
                <th>Complemento</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>Atualizar</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {enderecos ? (
                enderecos.map((endereco) => (
                  <tr key={endereco.id}>
                    <td>{endereco.logradouro}</td>
                    <td>{endereco.numero}</td>
                    <td>{endereco.complemento}</td>
                    <td>{endereco.cidade}</td>
                    <td>{endereco.estado}</td>
                    <td>
                      <Button
                        type="button"
                        class="btn-update"
                        value={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => updateEndereco(endereco.id)}
                      />
                    </td>
                    <td>
                      <Button
                        type="button"
                        class="btn-delete"
                        value={<FontAwesomeIcon icon={faTrashAlt} />}
                        onClick={() => deleteEndereco(endereco.id)}
                      />
                    </td>

              
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Sem endereços</td>
                </tr>
              )}
            </tbody>

            
            </table>
        </div>
      </div>
    </>
  );
}

export default Empresa;
