import React from "react";

import "../css/telaServicosEmpresa.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { api8080 } from "../api/apiToken";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Swal from "sweetalert2";
import Button from "../components/Button";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function CadastrarServicos(props) {
  const idEmpresa = sessionStorage.getItem("idEmpresa");

  const [options, setOptions] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicosVinculados, setServicosVinculados] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

    const getTipoServicos = async () => {
      try {
        const response = await api8080.get(
          `/categorias-servicos/` // path rota api
        );

        setOptions(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getServicos = async () => {
      try {
        const resposta = await api8080.get(
          `/servicos/` // path rota api
        );

        setServicos(resposta.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getServicosVinculados = async () => {
      try {
        const response = await api8080.get(
          `/servicos-empresas/` // path rota api
        );

        console.log(response.data);
        setServicosVinculados(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getTipoServicos();
    getServicos();
    getServicosVinculados();
  }, []);


  const CadastroServicoApi = (value) => {

    

    api8080.post(`/servicos-empresas/`, {

      idEmpresa: value.idEmpresa,
      idServico: value.idServico,
      valorServico: value.valorServico,
      duracaoEstimada: value.duracaoEstimada,
      equipeResponsavel: value.equipeResponsavel

    }).then((res) => {
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        showConfirmButton: true,
        timer: 1500
      })

      // setTimeout(() => {
      //   window.location.reload();
      // }, 10000);

    }).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar cadastro!",
        showConfirmButton: true,
        timer: 1500
      })


    })

  };

  const CadastroServicoNovo = (value) => {
    
    console.log(value.fkCategoriaServico)
    console.log(value.descricao)

    api8080.post(`/servicos/`, {

      descricao: value.descricao,
      fkCategoriaServico: value.fkCategoriaServico


    }).then((res) => {
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        showConfirmButton: true,
        timer: 1500
      })

      setTimeout(() => {
        window.location.reload();
      }, 2000);

    }).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar cadastro!",
        showConfirmButton: true,
        timer: 1500
      })


    })

  };

  const VincularServico = () => {
    Swal.fire({
      title: "Cadastrar Serviço",
      html: `
              <select id="idServico" class="swal2-input select-competencia">
              ${servicos
          ? servicos.map(
            (servico) =>
              `<option value=${servico.id}>
                        ${servico.descricao}
                        </option>`
          )
          : <option>Sem Serviços</option>
        }
              </select>

              <form>
                  <input id="duracaoEstimada" class="swal2-input" placeholder="duração Estimada (em minutos)">
                  <input id="valorServico"  class="swal2-input" placeholder="Valor do Serviço">
                  <input id="equipeResponsavel" class="swal2-input" placeholder="equipe Responsável">
              </form>    
              `,
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const idServico = Swal.getPopup().querySelector("#idServico").value;
        const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
        const valorServico = Swal.getPopup().querySelector("#valorServico").value;
        const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
        if (!duracaoEstimada || !valorServico || !equipeResponsavel) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        if (!idServico) {
          Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
        }
        return {
          idEmpresa: idEmpresa,
          idServico: idServico,
          valorServico: valorServico,
          duracaoEstimada: duracaoEstimada,
          equipeResponsavel: equipeResponsavel
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        CadastroServicoApi(result.value);
      }
    });
  };

  const cadastrarServico = () => {
    Swal.fire({
      title: "Cadastrar Serviço",
      html: `
      <select id="idCategoria" class="swal2-input select-competencia">
      ${options
          ? options.map(
            (categoria) =>
              `<option value=${categoria.id}>
                ${categoria.areaSaude}
                </option>`
          )
          : <option>Sem Serviços</option>
        }
      </select>

              <form>
                  <input id="descricao" class="swal2-input" placeholder="Descrição">
              </form>    
              `,
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const idCategoria = Swal.getPopup().querySelector("#idCategoria").value;
        const descricao = Swal.getPopup().querySelector("#descricao").value;
        if (!descricao) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        if (!idCategoria || idCategoria == undefined) {
          Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
        }
        return {
          fkCategoriaServico: idCategoria,
          descricao: descricao
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        CadastroServicoNovo(result.value);
      }
    });
  };

  const putServicoApi = (value) => {

    console.log(value.id)
    console.log(value.idEmpresa)
    console.log(value.idServico)
    console.log(value.valorServico)
    console.log(value.duracaoEstimada)
    console.log(value.equipeResponsavel)

    api8080.put(`/servicos-empresas/${value.id}`, {

      
      idEmpresa: value.idEmpresa,
      idServico: value.idServico,
      valorServico: value.valorServico,
      duracaoEstimada: value.duracaoEstimada,
      equipeResponsavel: value.equipeResponsavel

    }).then((res) => {
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Atualização realizada com sucesso!",
        showConfirmButton: true,
        timer: 1500
      })

      // setTimeout(() => {
      //   window.location.reload();
      // }, 10000);

    }).catch((err) => {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar atualização!",
        showConfirmButton: true,
        timer: 1500
      })


    })

  };

  const modalUpdateServico = (id) => {
    Swal.fire({
      title: "Atualizar Serviço",
      html: `
      <select id="idServico" class="swal2-input select-competencia">
              ${servicos
          ? servicos.map(
            (servico) =>
              `<option value=${servico.id}>
                        ${servico.descricao}
                        </option>`
          )
          : <option>Sem Serviços</option>
        }
              </select>

              <form>
                  <input id="duracaoEstimada" class="swal2-input" placeholder="duração Estimada (em minutos)">
                  <input id="valorServico"  class="swal2-input" placeholder="Valor do Serviço">
                  <input id="equipeResponsavel" class="swal2-input" placeholder="equipe Responsável">
              </form>     
              `,
              showCancelButton: true,
              confirmButtonText: "Cadastrar",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,
              preConfirm: () => {
                const idServico = Swal.getPopup().querySelector("#idServico").value;
                const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
                const valorServico = Swal.getPopup().querySelector("#valorServico").value;
                const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
                if (!duracaoEstimada || !valorServico || !equipeResponsavel) {
                  Swal.showValidationMessage(`Preencha todos os campos`);
                }
                if (!idServico) {
                  Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
                }
                return {
                  id: id,
                  idEmpresa: idEmpresa,
                  idServico: idServico,
                  valorServico: valorServico,
                  duracaoEstimada: duracaoEstimada,
                  equipeResponsavel: equipeResponsavel
                };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        putServicoApi(result.value);
      }
    });
  }

  const deleteServico = (idServico) => {
    Swal.fire({
      title: "Tem certeza que deseja desvincular este serviço?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        api8080
          .delete(`/servicos-empresas/${idServico}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Serviço desvinculado com sucesso!",
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
              title: "Erro ao deletar serviço",
              showConfirmButton: true,
              timer: 1500,
            });
            console.log(e);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <>
      <NavbarPosLogin />
      <div className="container">
        <div className="btns-servicos">


          <Button
            type="button"
            id="Cadastrar"
            onClick={cadastrarServico}
            value="Cadastrar Serviço"
          />

          <Button
            type="button"
            id="Cadastrar"
            onClick={VincularServico}
            value="Vincular Serviço"
          />

        </div>

        <div className="card-read-servicos">
          <div className="titulo">
            Serviços Vinculados
          </div>
          <table>
            <thead>
              <tr>
                <th>Valor do Serviço</th>
                <th>Duração Estimada</th>
                <th>Equipe responsável</th>
              </tr>
            </thead>
            <tbody>
              {
                servicosVinculados ? servicosVinculados.map((servicoVinculado) => (
                  <tr key={servicoVinculado.id}>
                    <td>{servicoVinculado.valorServico}</td>
                    <td>{servicoVinculado.duracaoEstimada}</td>
                    <td>{servicoVinculado.equipeResponsavel}</td>
                    <td>

                      <Button type="button" class="btn-update" value={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => modalUpdateServico(servicoVinculado.id)} />
                    </td>
                    <td>
                      <Button type="button" class="btn-delete" value={<FontAwesomeIcon icon={faTrashAlt} />}
                        onClick={() => deleteServico(servicoVinculado.id)} />
                    </td>
                  </tr>
                )) : <tr><td>Sem Serviços vinculados</td></tr>
              }
            </tbody>
          </table>
        </div>

        <div className="card-read-servicos">
          <div className="titulo">
            Serviços Cadastrados
          </div>
          <table>

            <thead>
              <tr>
                <th>Área saúde</th>
              </tr>
            </thead>
            <tbody>
              {
                servicos ? servicos.map((servico) => (
                  <tr key={servico.id}>
                    <td>{servico.descricao}</td>
                  </tr>
                )) : <tr><td>Sem Serviços cadastrados</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}



export default CadastrarServicos;
