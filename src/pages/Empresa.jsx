import React from "react";

import { useState, useEffect, useRef } from "react";
import NavbarPosLogin from "../components/NavBarPosLogin";
import "../css/empresa.modules.css";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { api8080 } from "../api/apiToken";
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import sentinela from "../api/sentinela";

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
    sentinela();

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
    };

    const getCountFuncionarios = async () => {
      try {
        const response = await api8080.get(
          `/funcionarios/count-empresa/${idEmpresa}`
        );
        setCountFuncionarios(response.data);
      } catch (err) {
        console.log(err);
      }
    };

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
                    <input id="razaoSocial" class="swal2-input" placeholder="Razão Social" value=${empresas?.razaoSocial}>
                    <input id="cnpj" class="swal2-input" placeholder"CNPJ" value=${empresas?.cnpj} disabled>
                    <input id="email" class="swal2-input" placeholder="Email" type="email" value=${empresas?.email}>
                    <input id="senha" type="password" class="swal2-input" placeholder="Senha" value=${empresas?.senha}>
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
      title: "Atualizar Funcionário",
      html: `
      <form>
      <input id="nome" class="swal2-input" placeholder="Nome" value = ${
        funcionarios?.find((funcionario) => funcionario.id === id).nome
      }
      >
      <input id="email" class="swal2-input" placeholder="Email" type="email">
      <input id="tel" class="swal2-input" placeholder="Telefone" type="tel">
      <input id="cpf" class="swal2-input" placeholder="CPF" value=${
        funcionarios?.find((funcionario) => funcionario.id === id).cpf
      } disabled>
      <input id="funcional" class="swal2-input" placeholder="Número Funcional" type="number" value=${
        funcionarios?.find((funcionario) => funcionario.id === id).funcional
      } disabled>

      <input id="numeroRegAtuacao" class="swal2-input" placeholder="Número de Registro de Atuação" type="number" value=${
        funcionarios?.find((funcionario) => funcionario.id === id)
          .numeroRegistroAtuacao
      } disabled>

  </form>   `,

      showCancelButton: true,
      width: "600px",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nome = Swal.getPopup().querySelector("#nome").value;
        const email = Swal.getPopup().querySelector("#email").value;
        const tel = Swal.getPopup().querySelector("#tel").value;
        const cpf = Swal.getPopup().querySelector("#cpf").value;
        const funcional = Swal.getPopup().querySelector("#funcional").value;
        const numeroRegAtuacao =
          Swal.getPopup().querySelector("#numeroRegAtuacao").value;
        if (!nome || !email || !cpf  || !funcional || !numeroRegAtuacao) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          id: id,
          nome: nome,
          email: email,
          tel: tel,
          cpf: cpf,
          funcional: funcional,
          numeroRegistroAtuacao: numeroRegAtuacao,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        updateFuncionario(result.value);
      }
    });
  };

  const updateFuncionario = (value) => {
    api8080
      .put(`/funcionarios/${value.id}`, {
        nome: value.nome,
        email: value.email,
        tel: value.tel,
        cpf: value.cpf,
        funcional: value.funcional,
        numeroRegistroAtuacao: value.numeroRegistroAtuacao,
        empresaId: parseInt(idEmpresa),
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
        Swal.fire({
          icon: "error",
          title: "Erro ao realizar alterações!",
          showConfirmButton: true,
          timer: 1500,
        });

        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      });
  };

  async function getIdFuncionario(cpf) {
    let response = await api8080.get(`/funcionarios/cpf/${cpf}`);
    let data = response.data;
    return data;
  }

  const cadastrarFuncionario = async () => {
    Swal.fire({
      title: "Cadastrar Funcionário",
      html: `
      <form>
      <input id="nome" class="swal2-input" placeholder="Nome">
      <input id="email" class="swal2-input" placeholder="Email" type="email">
      <input id="tel" class="swal2-input" placeholder="Telefone" type="tel">
      <input id="cpf" class="swal2-input" placeholder="CPF" maxLength="14">
      <input id="funcional" class="swal2-input" placeholder="Número Funcional" type="number">
      <input id="numeroRegAtuacao" class="swal2-input" placeholder="Número de Registro de Atuação" type="number">
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
        const tel = Swal.getPopup().querySelector("#tel").value;
        const cpf = Swal.getPopup().querySelector("#cpf").value;
        const funcional = Swal.getPopup().querySelector("#funcional").value;
        const numeroRegAtuacao =
          Swal.getPopup().querySelector("#numeroRegAtuacao").value;

        if (!nome || !email || !cpf || !funcional || !numeroRegAtuacao || !tel) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        return {
          nome: nome,
          email: email,
          tel: tel,
          cpf: cpf,
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
            tel: result.value.tel,
            cpf: result.value.cpf,
            funcional: result.value.funcional,
            numeroRegistroAtuacao: result.value.numeroRegAtuacao,
            empresaId: parseInt(idEmpresa),
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
            }, 2000);
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
    mostrarModal ? setMostrarModal(false) : setMostrarModal(true);
  };

  const updateEndereco = (idEndereco) => {
    console.log(
      enderecos?.find((endereco) => endereco.id === idEndereco).logradouro
    );
    Swal.fire({
      title: "Atualizar Endereço",
      html: `
      <form>
      <input id="logradouro" class="swal2-input" placeholder="Logradouro" value="${
        enderecos?.find((endereco) => endereco.id === idEndereco).logradouro
      }"/>
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
        if (!logradouro || !numero || !complemento || !cidade || !estado) {
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
        api8080
          .put(`/enderecos/empresas/${idEndereco}`, {
            logradouro: result.value.logradouro,
            numero: result.value.numero,
            complemento: result.value.complemento,
            cidade: result.value.cidade,
            estado: result.value.estado,
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
            Swal.fire({
              icon: "error",
              title: "Erro ao realizar alterações!",
              showConfirmButton: true,
              timer: 1500,
            });
          });
      }
    });
  };

  const deleteEndereco = (idEndereco) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir este endereço?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        api8080
          .delete(`/enderecos/empresas/${idEndereco}`)
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

            setTimeout(() => {
              window.location.reload();
            }
            , 2000);
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
              class="btn"
            />

            <Button
              type="button"
              id="btn-update"
              value="Cadastrar Endereço"
              onClick={handleBotaoClick}
              class="btn"
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
              class="btn"
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

          {/* <Button
          type="button"
          id="btn-contrato"
          onClick={() => cadastroEmMassa()}
          value="Cadastro em massa" /> */}
        </div>
      </div>
    </>
  );
}

export default Empresa;
