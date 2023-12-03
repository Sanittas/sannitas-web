import React, { useState, useEffect } from "react";
import "../css/cliente.css";
import { api8081 } from "../api/apiToken";
import Swal from "sweetalert2";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Input from "../components/Input";
import Button from "../components/Button";

function Cliente() {
  const idUsuario = sessionStorage.getItem("id");

  const [usuario, setUsuario] = useState({});
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await api8081.get(`/usuarios/${idUsuario}`);
        setUsuario(response.data);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setSenha(response.data.senha);
      } catch (error) {
        console.error("Erro ao obter informações do usuário:", error);
      }
    }

    if (idUsuario) {
      fetchUserInfo();
    }
  }, [idUsuario]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await api8081.put(`/usuarios/${idUsuario}`, {
        nome,
        email,
        cpf,
        senha,
      });

      Swal.fire({
        icon: "success",
        title: "Alterações realizadas com sucesso!",
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao realizar alterações!",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <NavbarPosLogin />

      <div className="container-cliente">
        <div className="cliente">
          <form onSubmit={handleSave}>
            <h1>Olá, {sessionStorage.getItem("nome")}! Suas Informações</h1>
            <div className="input-group">
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(value) => setNome(value)}
              />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(value) => setEmail(value)}
              />

              <Input
                id="cpf"
                type="text"
                placeholder="Digite seu CPF"
                value={cpf}
                onChange={(value) => setCpf(value)}
                disabled
              />

              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                onChange={(value) => setSenha(value)}
              />
            </div>

            <Button
              type="submit"
              id="btn-cadastrar"
              value="Salvar alterações"
              onClick={handleSave}
            />
          </form>
        </div>

        <div className="servicos-contratados">
          <h1>Serviços contratados</h1>
          <div className="servicos-contratados-container">
            {/* props.servicos.map((servico) => (
                <div className="servico-contratado" key={servico.id}>
                    <h3>{servico.nome}</h3>
                    <p>{servico.descricao}</p>
                    <p>{servico.preco}</p>
                </div>
            )) */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cliente;
