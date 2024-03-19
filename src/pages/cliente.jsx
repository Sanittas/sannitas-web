import React, { useState, useEffect } from "react";
import "../css/cliente.css";
import { api8081} from "../api/api";
import { api8080, api8081 } from "../api/api";
import Swal from "sweetalert2";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";

function Cliente() {
  const idUsuario = sessionStorage.getItem("id");

  const [usuario, setUsuario] = useState({});
  const [servicosContratados, setServicosContratados] = useState([]); // [
  const [enderecos, setEnderecos] = useState([]);
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

    const getEnderecos = async () => {
      try {
        const response = await api8081.get(`enderecos/usuarios/${idUsuario}`);
        console.log(response);
        setEnderecos(response.data);
      } catch (error) {
        console.error("Erro ao obter endereços do usuário:", error);
      }
    };

    const getServicosContratados = async () => {
      try {
        const response = await api8080.get(`/agendamentos/${idUsuario}`);
        console.log(response);
        setServicosContratados(response.data);
      } catch (error) {
        console.error("Erro ao obter serviços contratados:", error);
      }
    };

    if (idUsuario) {
      fetchUserInfo();
      getEnderecos();
      getServicosContratados();
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

      setInterval(() => {
        window.location.reload();
      }, 2500);
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

  const [viewModal, setViewModal] = useState(false);

  const handleBotaoClick = () => {
    viewModal ? setViewModal(false) : setViewModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await api8081.delete(`/enderecos/usuarios/${id}`);
      Swal.fire({
        icon: "success",
        title: "Endereço excluído com sucesso!",
        showConfirmButton: true,
        timer: 1500,
      });
      setInterval(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro ao excluir endereço!",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  const handleEdit = async (value) => {
    Swal.fire({
      title: "Editar Endereço",
      width: 600,
      html: `<input id="swal-input1" class="swal2-input" placeholder="Logradouro" value="${value.logradouro}">
      <input id="swal-input2" class="swal2-input" placeholder="Número" value="${value.numero}">
      <input id="swal-input3" class="swal2-input" placeholder="Complemento" value="${value.complemento}">
      <input id="swal-input4" class="swal2-input" placeholder="Cidade" value="${value.cidade}">
      <input id="swal-input5" class="swal2-input" placeholder="Estado" value="${value.estado}">`,
      confirmButtonText: "Salvar",
      focusConfirm: false,
      preConfirm: () => {
        const logradouro = Swal.getPopup().querySelector("#swal-input1").value;
        const numero = Swal.getPopup().querySelector("#swal-input2").value;
        const complemento = Swal.getPopup().querySelector("#swal-input3").value;
        const cidade = Swal.getPopup().querySelector("#swal-input4").value;
        const estado = Swal.getPopup().querySelector("#swal-input5").value;

        if (!logradouro || !numero || !cidade || !estado) {
          Swal.showValidationMessage(`Preencha todos os campos!`);
        }

        return { logradouro, numero, complemento, cidade, estado };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const logradouro = result.value.logradouro;
        const numero = result.value.numero;
        const complemento = result.value.complemento;
        const cidade = result.value.cidade;
        const estado = result.value.estado;

        api8081
          .put(`/enderecos/usuarios/${value.id}`, {
            logradouro: logradouro,
            numero: numero,
            complemento: complemento,
            cidade: cidade,
            estado: estado,
          })
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "Endereço Editado com Sucesso!",
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
              title: "Erro ao Editar o Endereço",
              showConfirmButton: true,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <>
      <NavbarPosLogin />

      <div className="container-cliente">
        <div className="perfil-cliente">
          <div className="cliente">
            <form onSubmit={handleSave}>
              <h1>Olá, {sessionStorage.getItem("nome")}</h1>
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

          <div className="enderecos">
            <h1>Endereços</h1>
            <Button
              type="submit"
              id="btn-cadastrar"
              value="Cadastrar Endereço"
              onClick={handleBotaoClick}
            />
            <div className="enderecos-container">
              {enderecos ? (
                enderecos.map((endereco) => (
                  <div className="endereco" key={endereco.id}>
                    <label>Logradouro</label>
                    <p>{endereco.logradouro}</p>
                    <label>Número</label>
                    <p>{endereco.numero}</p>
                    <label>Complemento</label>
                    <p>{endereco.complemento}</p>
                    <label>Cidade</label>
                    <p>{endereco.cidade}</p>
                    <label>Estado</label>
                    <p>{endereco.estado}</p>

                    <Button
                      type="submit"
                      id="btn-cadastrar"
                      value="Excluir Endereço"
                      onClick={() => handleDelete(endereco.id)}
                    />
                    <Button
                      type="submit"
                      id="btn-cadastrar"
                      value="Editar Endereço"
                      onClick={() => handleEdit(endereco)}
                    />
                  </div>
                ))
              ) : null}
              {viewModal ? <ModalCadastroEndereco /> : null}
            </div>
          </div>
        </div>

        {/* <div className="servicos-contratados">
          <h1>Serviços contratados</h1>
          <div className="servicos-contratados-container">
            {
              servicosContratados.length > 0 ? servicosContratados.map((servicoContratado, i) => (
                <div className="servico-contratado" key={servicoContratado.id}>                  
                  <label>Duração</label>
                  <p>{servicoContratado.servicoEmpresa.duracaoEstimada} minutos</p>
                  <label>Valor</label>
                  <p>R$ {servicoContratado.servicoEmpresa.valorServico}</p>
                  <label>Data do agendamento</label>
                  <p>{servicoContratado.dataHoraAgendamento.substring(
                    0,
                    servicoContratado.dataHoraAgendamento.indexOf("T")
                  )}</p>
                  <label>Nome da empresa</label>
                  <p>{servicoContratado.servicoEmpresa.empresa.razaoSocial}</p>
                </div>
              )) : <p>Você ainda não contratou nenhum serviço!</p> 
            }
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Cliente;
