import React, { useState, useEffect } from "react";
import "../css/cliente.css";
// import { api8081} from "../api/api";
import { apiEmpresas, apiUsuarios } from "../api/api";
import Swal from "sweetalert2";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";
import sentinela from "../api/sentinela";
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
      sentinela();
    async function fetchUserInfo() {
      try {
        const response = await apiUsuarios.get(`/usuarios/${idUsuario}`);
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
        const response = await apiUsuarios.get(`usuarios/enderecos/${idUsuario}`);
        console.log(response);
        setEnderecos(response.data);
      } catch (error) {
        console.error("Erro ao obter endereços do usuário:", error);
      }
    };

    const getServicosContratados = async () => {
      try {
        const response = await apiEmpresas.get(`empresas/agendamentos/usuario/${idUsuario}`);
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
      await apiUsuarios.put(`/usuarios/${idUsuario}`, {
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
      await apiUsuarios.delete(`usuarios/enderecos/${id}`);
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

        apiUsuarios
          .put(`usuarios/enderecos/${value.id}`, {
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

        <div className="servicos-contratados">
          <h1>Serviços contratados</h1>
          <div className="card-read-servicos">
          {
              servicosContratados.length > 0 ? servicosContratados.map((servicoContratado, i) => (
              
                  <table>
                    <tbody>
                  <thead>
              <tr>
              <th>Data e Hora</th>
              <th>Serviço</th>
              </tr>
              </thead>
              <div key={servicoContratado.id}>
              <td>{servicoContratado.dataHoraAgendamento}</td>
              <td>{servicoContratado.servico.descricao}</td>
              </div>
                </tbody>
              </table>

              
              

              )) : <p>Você ainda não contratou nenhum serviço!</p> 
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Cliente;
