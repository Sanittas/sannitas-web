import React from "react";

import { useState } from "react";

import "../css/modalEndereco.css";

import { api8081, api8080 } from "../api/apiToken";

import apiViaCep from "../api/apiViaCep";
import mascara from "../api/mascara";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

function ModalCadastroEndereco(props) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");

  const buscarCep = () => {
    apiViaCep
      .get(`/${cep}/json`)
      .then((res) => {
        console.log(res);
        setLogradouro(res.data.logradouro);
        setBairro(res.data.bairro);
        setCidade(res.data.localidade);
        setUf(res.data.uf);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cadastrarEndereco = () => {
    const token = sessionStorage.getItem("token");
    var idUsuario = sessionStorage.getItem("id");
    var idEmpresa = sessionStorage.getItem("idEmpresa");

    idEmpresa
      ? api8080
          .post(`/enderecos/empresas/${idEmpresa}`, {
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: uf,
          })
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "Endereço Cadastrado com Sucesso!",
              showConfirmButton: true,
              timer: 1500,
            });

            setInterval(() => {
              window.location.reload();
            }, 2500);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Erro ao Cadastrar o Endereço",
              showConfirmButton: true,
              timer: 1500,
            });
          })
      : api8081
          .post(`/enderecos/usuarios/${idUsuario}`, {
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: uf,
          })
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "Endereço Cadastrado com Sucesso!",
              showConfirmButton: true,
              timer: 1500,
            });

            setInterval(() => {
              window.location.reload();
            }, 2500);
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Erro ao Cadastrar o Endereço",
              showConfirmButton: true,
              timer: 1500,
            });
          });
  };

  const formatCep = (e) => {
    setCep(mascara.mascaraCep(e.target.value));
  };

  const fecharModal = () => {
    var modalStyle = document.querySelector(".modalCadastroEndereco");
    modalStyle.style.display = "none";
  };

  return (
    <div className="modalCadastroEndereco">
      <div className="modalCadastroEnderecoContainer">
        <div className="modalCadastroEnderecoHeader">
          <h2>Cadastro de Endereço</h2>
          <button onClick={fecharModal}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
        <div className="modalCadastroEnderecoBody">
          <div className="modalCadastroEnderecoBodyContainer">
            <div className="modalCadastroEnderecoBodyContainerCep">
              <label htmlFor="cep">CEP</label>
              <input
                maxLength="9"
                type="text"
                id="cep"
                name="cep"
                value={cep}
                onChange={formatCep}
              />
              <button onClick={buscarCep}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
            <div className="modalCadastroEnderecoBodyContainerLogradouro">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                type="text"
                id="logradouro"
                name="logradouro"
                value={logradouro}
                onChange={(e) => {
                  setLogradouro(e.target.value);
                }}
              />
            </div>
            <div className="modalCadastroEnderecoBodyContainerNumero">
              <label htmlFor="numero">Número</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={numero}
                onChange={(e) => {
                  setNumero(e.target.value);
                }}
              />
            </div>
            <div className="modalCadastroEnderecoBodyContainerComplemento">
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                value={complemento}
                onChange={(e) => {
                  setComplemento(e.target.value);
                }}
              />
            </div>
            <div className="modalCadastroEnderecoBodyContainerBairro">
              <label htmlFor="bairro">Bairro</label>
              <input
                type="text"
                id="bairro"
                name="bairro"
                value={bairro}
                onChange={(e) => {
                  setBairro(e.target.value);
                }}
              />
            </div>
            <div className="modalCadastroEnderecoBodyContainerCidade">
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={cidade}
                onChange={(e) => {
                  setCidade(e.target.value);
                }}
              />
            </div>
            <div className="modalCadastroEnderecoBodyContainerUf">
              <label htmlFor="uf">UF</label>
              <input
                type="text"
                id="uf"
                name="uf"
                value={uf}
                onChange={(e) => {
                  setUf(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="modalCadastroEnderecoFooter">
          <button onClick={cadastrarEndereco}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCadastroEndereco;
