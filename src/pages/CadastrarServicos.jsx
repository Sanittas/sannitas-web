import React from "react";

import "../css/telaServicosEmpresa.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {api} from "../api/api";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { Select } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";

function CadastrarServicos(props) {
  const idEmpresa = sessionStorage.getItem("idEmpresa");
  const [razaoSocial, setRazaoSocial] = useState();
  const [cnpj, setCnpj] = useState();
  const [email, setEmail] = useState();

  const [options, setOptions] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [servicosVinculados, setServicosVinculados] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

    const getTipoServicos = async () => {
      try {
        const response = await api.get(
          `/categoria-servico/` // path rota api
        );

        const opcoesTransformadas = response.data.map(item => ({
          value: item.id,
          label: item.descricao,
        }));

        setOptions(opcoesTransformadas);
      } catch (err) {
        console.log(err);
      }
    };

    const getServicos = async () => {
      try {
        const response = await api.get(
          `` // path rota api
        );

        setServicos(response.data);

      } catch (err) {
        console.log(err);
      }
    };

    const getServicosVinculados = async () => {
      try {
        const response = await api.get(
          `` // path rota api
        );

        setServicosVinculados(response.data);

      } catch (err) {
        console.log(err);
      }
    };

    getTipoServicos();
    getServicos();
  }, []);


  const CadastroServicoApi = (value) => {

    api.post(`/servico-empresa/`, {

      idEmpresa: value.idEmpresa,
      duracaoEstimada: value.duracaoEstimada,
      valorServico: value.valorServico,
      equipeResponsavel: value.equipeResponsavel,
      tipoServico: value.opcaoSelecionada

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

  const CadastroServicoNovo = (value) => {

    api.post(`/servico-empresa/`, {

      fkCategoriaServico: value.opcaoSelecionada,
      descricao: value.descricao


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
              <Select id="selectOpcoes" options={servicos} value={selectedOption} onChange={setSelectedOption}/>

              <form>
                  <input id="duracaoEstimada" class="swal2-input" placeholder="duração Estimada">
                  <input id="valorServico" type="password" class="swal2-input" placeholder="Valor do Serviço">
                  <input id="equipeResponsavel" class="swal2-input" placeholder="equipe Responsável">
              </form>    
              `,
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const opcaoSelecionada = Swal.getPopup().querySelector("#selectOpcoes").value;
        const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
        const valorServico = Swal.getPopup().querySelector("#valorServico").value;
        const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
        if (!duracaoEstimada || !valorServico || !equipeResponsavel) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        if (!opcaoSelecionada) {
          Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
        }
        return {
          idEmpresa: idEmpresa,
          duracaoEstimada: duracaoEstimada,
          valorServico: valorServico,
          equipeResponsavel: equipeResponsavel,
          tipoServico: opcaoSelecionada
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
              <Select id="selectOpcoes" options={options} value={selectedOption} onChange={setSelectedOption}/>

              <form>
                  <input id="descricao" class="swal2-input" placeholder="Descrição">
              </form>    
              `,
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const opcaoSelecionada = Swal.getPopup().querySelector("#selectOpcoes").value;
        const descricao = Swal.getPopup().querySelector("#descricao").value;
        if (!descricao) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        if (!opcaoSelecionada) {
          Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
        }
        return {
          fkCategoriaServico: opcaoSelecionada,
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


  const modalUpdateServico = (id) => {
    Swal.fire({
      title: "Atualizar Serviço",
      html: `
              <Select id="selectOpcoes" options={servicos} value={selectedOption} onChange={setSelectedOption}/>

              <form>
                  <input id="duracaoEstimada" class="swal2-input" placeholder="duração Estimada">
                  <input id="valorServico" type="password" class="swal2-input" placeholder="Valor do Serviço">
                  <input id="equipeResponsavel" class="swal2-input" placeholder="equipe Responsável">
              </form>    
              `,
      showCancelButton: true,
      confirmButtonText: "Cadastrar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const opcaoSelecionada = Swal.getPopup().querySelector("#selectOpcoes").value;
        const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
        const valorServico = Swal.getPopup().querySelector("#valorServico").value;
        const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
        if (!duracaoEstimada || !valorServico || !equipeResponsavel) {
          Swal.showValidationMessage(`Preencha todos os campos`);
        }
        if (!opcaoSelecionada) {
          Swal.showValidationMessage(`Selecione um tipo de serviço na lista`);
        }
        return {
          idEmpresa: idEmpresa,
          duracaoEstimada: duracaoEstimada,
          valorServico: valorServico,
          equipeResponsavel: equipeResponsavel,
          tipoServico: opcaoSelecionada
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        CadastroServicoApi(result.value);
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
        api
          .delete(``) // sem back end no momento
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
                <th>Nome do Serviço</th>
                <th>Área saúde</th>
              </tr>
            </thead>
            <tbody>
              {
                servicos ? servicos.map((servico) => (
                  <tr key={servico.id}>
                    <td>{servico.descricao}</td>
                    <td>{servico.areaSaude}</td>
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
