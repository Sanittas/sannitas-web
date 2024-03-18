import React from "react";

import "../css/telaServicosEmpresa.css"
import { useState, useEffect } from "react";
import { api8080 } from "../api/apiToken";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Swal from "sweetalert2";
import Button from "../components/Button";
import sentinela from "../api/sentinela";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
function CadastrarServicos(props) {
  const idEmpresa = sessionStorage.getItem("idEmpresa");

  const [options, setOptions] = useState([]);
  const [servicos, setServicos] = useState([]);
  // const [servicosVinculados, setServicosVinculados] = useState([]);

  useEffect(() => {
    sentinela();

    // const getTipoServicos = async () => {
    //   try {
    //     const response = await api8080.get(
    //       `/categorias-servicos/` // path rota api
    //     );

    //     setOptions(response.data);
    //     console.log(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

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

    // const getServicosVinculados = async () => {
    //   try {
    //     const response = await api8080.get(
    //       `/servicos-empresas/` // path rota api
    //     );

    //     console.log(response.data);
    //     setServicosVinculados(response.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // getTipoServicos();
    getServicos();
    // getServicosVinculados();
  }, []);


  const CadastroServicoApi = (value) => {

    

    api8080.post(`/servicos/`, {

      areaSaude: value.areaSaude,
      descricao: value.descricao,
      duracaoEstimada: value.duracaoEstimada,
      valor: value.valor

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
      }, 2500);

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
    
    console.log(value.areaSaude)
    console.log(value.descricao)
    console.log(value.duracaoEstimada)
    console.log(value.valor)

    api8080.post(`/servicos/`, {

      areaSaude: value.areaSaude,
      descricao: value.descricao,
      duracaoEstimada: value.duracaoEstimada,
      valor: value.valor


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
      title: "Vincular Serviço",
      html: `
              <form>
                  <input id="areaSaude" class="swal2-input" Área Saúde" placeholder="Área Saúde">
                  <input id="descricao" class="swal2-input" placeholder="Descrição">
                  <input id="duracaoEstimada" class="swal2-input" placeholder="Duração Estimada (em minutos)">
                  <input id="valor"  class="swal2-input" placeholder="Valor do Serviço">
              </form>     
              `,
              width: "600px",
              showCancelButton: true,
              confirmButtonText: "Cadastrar",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,
              preConfirm: () => {
                // const idServico = Swal.getPopup().querySelector("#idServico").value;
                const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
                const valorServico = Swal.getPopup().querySelector("#valor").value;
                const areaSaude = Swal.getPopup().querySelector("#areaSaude").value;
                const descricao = Swal.getPopup().querySelector("#descricao").value;
                // const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
                if (!duracaoEstimada || !valorServico || !areaSaude || !descricao) {
                  Swal.showValidationMessage(`Preencha todos os campos`);
                }
                return {
                  duracaoEstimada: duracaoEstimada,
                  areaSaude: areaSaude,
                  valor: valorServico,
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
    console.log(value.valor)
    console.log(value.duracaoEstimada)

    api8080.put(`/servicos/${value.id}`, {

      
      descricao: value.descricao,
      areaSaude: value.areaSaude,
      valor: value.valor,
      duracaoEstimada: value.duracaoEstimada,

    }).then((res) => {
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Atualização realizada com sucesso!",
        showConfirmButton: true,
        timer: 1500
      })

      setTimeout(() => {
        window.location.reload();
      }, 10000);

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
              <form>
                  <input id="areaSaude" class="swal2-input" Área Saúde" placeholder="Área Saúde">
                  <input id="descricao" class="swal2-input" placeholder="Descrição">
                  <input id="duracaoEstimada" class="swal2-input" placeholder="Duração Estimada (em minutos)">
                  <input id="valor"  class="swal2-input" placeholder="Valor do Serviço">
              </form>     
              `,
              width: "600px",
              showCancelButton: true,
              confirmButtonText: "Cadastrar",
              cancelButtonText: "Cancelar",
              showLoaderOnConfirm: true,
              preConfirm: () => {
                // const idServico = Swal.getPopup().querySelector("#idServico").value;
                const duracaoEstimada = Swal.getPopup().querySelector("#duracaoEstimada").value;
                const valorServico = Swal.getPopup().querySelector("#valor").value;
                const areaSaude = Swal.getPopup().querySelector("#areaSaude").value;
                const descricao = Swal.getPopup().querySelector("#descricao").value;
                // const equipeResponsavel = Swal.getPopup().querySelector("#equipeResponsavel").value;
                if (!duracaoEstimada || !valorServico || !areaSaude || !descricao) {
                  Swal.showValidationMessage(`Preencha todos os campos`);
                }
                return {
                  id: id,
                  duracaoEstimada: duracaoEstimada,
                  areaSaude: areaSaude,
                  valor: valorServico,
                  descricao: descricao
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
      <div className="container-tela-servicos">
        <div className="btns-servicos">


          {/* <Button
            type="button"
            id="Cadastrar"
            // onClick={cadastrarServico}
            value="Cadastrar Serviço"
          /> */}

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
                <th>Área Saude</th>
                <th>Descrição</th>
                <th>Duração Estimada</th>
                <th>Valor do Serviço</th>
                <th>Atualizar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {
                servicos ? servicos.map((servicoVinculado) => (
                  <tr key={servicoVinculado.id}>
                    <td>{servicoVinculado.areaSaude}</td>
                    <td>{servicoVinculado.descricao}</td>
                    <td>{servicoVinculado.duracaoEstimada}</td>
                    <td>{servicoVinculado.valor}</td>
                    <td>

                      <Button type="button" class="btn-update2" value={<FontAwesomeIcon icon={faPen} />}
                        onClick={() => modalUpdateServico(servicoVinculado.id)} />
                    </td>
                    <td>
                      <Button type="button" class="btn-delete2" value={<FontAwesomeIcon icon={faTrashAlt} />}
                        onClick={() => deleteServico(servicoVinculado.id)} />
                    </td>
                  </tr>
                )) : <tr><td>Sem Serviços vinculados</td></tr>
              }
            </tbody>
          </table>
        </div>

        {/* <div className="card-read-servicos">
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
        </div> */}
      </div>

    </>
  );
}



export default CadastrarServicos;
