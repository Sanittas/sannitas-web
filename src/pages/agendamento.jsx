import React, { useState, useEffect } from "react";
import "../css/agendamento.css";
import "react-calendar/dist/Calendar.css";
import { api8080 } from "../api/api";
import { api8081 } from "../api/api";
import Swal from "sweetalert2";
import Button from "../components/Button";
import NavbarPosLogin from "../components/NavBarPosLogin";
import { format } from "date-fns";
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import sentinela from "../api/sentinela";





// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
dayjs.locale("pt-br");
function Agendamento() {

  const idServico = sessionStorage.getItem("idServico");
  const idUsuario = sessionStorage.getItem("id");
  const [value, setValue] = useState(new Date());
  const [endereco, setEndereco] = useState([]);
  const [usuario, setUsuario] = useState();
  const [servico, setServico] = useState();

  useEffect(() => {
      sentinela();

    const getEndereco = async () => {
      try {
        const response = await api8081.get(`/enderecos/usuarios/${idUsuario}`);
        setEndereco(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getUsuario = async () => {
      try {
        const response = await api8081.get(`/usuarios/${idUsuario}`);
        setUsuario(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getServico = async () => {
      try {
        const response = await api8080.get(`/servicos/${idServico}`);
        setServico(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getEndereco();
    getUsuario();
    getServico();
  }, []);

  const [viewModal, setViewModal] = useState(false);





  function agendar(id) {
    setViewModal(false);
    if (endereco) {
      var cpf = usuario?.cpf;
      var email = usuario?.email;

      api8081.post("/usuarios/pagamentos/criar-pagamento", {
        cpf: cpf,
        nome: usuario?.nome,
        email: email,
        valor: 0.01,
        nomeProduto: servico?.descricao,
      
      }).then((infoPagamento) => {
        console.log(infoPagamento);
        let encoded = encodeURIComponent(infoPagamento.data.qrCode);
        console.log(encoded);
          api8080
            .post(`/agendamentos/`, {
              dataAgendamento: format(value, "yyyy-MM-dd HH:mm:ss"),
              idServico: idServico,
              idUsuario: idUsuario,
              idFuncionario: 1,
            })
            .then((res) => {
              console.log(res);

              Swal.fire({
                icon: "success",
                title: "Agendamento realizado com sucesso! Será redirecionado para o pagamento!",
                showConfirmButton: true,
                timer: 5000,
              });

              window.location.href = `/pagamento/${encoded}/${infoPagamento.data.valor}/${infoPagamento.data.id}`;

            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Erro ao realizar agendamento!",
                showConfirmButton: true,
                timer: 2500,
              });

              // window.location.reload();
            });
        })
        .catch((err) => {
          console.log(err);

          Swal.fire({
            icon: "error",
            title: "Erro ao realizar pagamento! Tente novamente",
            showConfirmButton: true,
            timer: 2500,
          });

          window.location.reload();
        });
    } else {
      setViewModal(true);
    }
  }

  return (
    <>
      <NavbarPosLogin />
      <div className="container-agendamento">
        <div className="container-info-cliente">
          <div className="info-cliente">
            <h1>Informações do Cliente</h1>
            <p>
              Nome: <span>{usuario?.nome}</span>
            </p>
            <p>
              Email: <span>{usuario?.email}</span>
            </p>
            <p>
              Telefone: <span>{usuario?.telefone}</span>
            </p>
          </div>
          <hr></hr>
          {endereco.length > 0 ? (
            <div className="info-endereco">
              <h1>Endereço</h1>
              <p>Logradouro: {endereco[0].logradouro}</p>
              <p>Número: {endereco[0].numero}</p>
              <p>Complemento: {endereco[0].complemento}</p>
              <p>Cidade: {endereco[0].cidade}</p>
              <p>Estado: {endereco[0].estado}</p>
            </div>
          ) : (
            <div className="info-endereco">
              <h1>Informações do Endereço</h1>
              <p>Endereço não cadastrado</p>
              <Button
                type="button"
                id="btn-endereco"
                onClick={() => setViewModal(true)}
                value="Cadastrar Endereço"
              />
            </div>
          )}
          <hr></hr>
          <div className="info-servico">
            <h1>Agendamento</h1>
            <p>Escolha a data e hora para agendar o serviço</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Data e Hora"
                format="DD/MM/YYYY HH:mm:ss"
                value={dayjs(value)}
                onChange={(newValue) => {
                  var date = new Date(newValue);
                  var day = date.getDate();
                  var month = date.getMonth();
                  var year = date.getFullYear();
                  var hour = date.getHours();
                  var minute = date.getMinutes();
                  var second = date.getSeconds();
                  setValue(new Date(year, month, day, hour, minute, second));
                }}
                disablePast
                size="medium"
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="container-info-servicos">
          <h1>Informações do Serviço</h1>
          <p>
            Nome: <span>{servico?.descricao}</span>
          </p>
          <p>
            Descrição: <span>{servico?.areaSaude}</span>
          </p>
          <p>
            Valor: <span>R$ {servico?.valor}</span>
          </p>
          <p>
            Duração: <span>{servico?.duracaoEstimada} minutos</span>
          </p>

          <hr />
          <h1>Informações do Profissional</h1>
          <p>
            Nome: <span>{servico?.profissional?.nome}</span>
          </p>
          <p>
            Email: <span>{servico?.profissional?.email}</span>
          </p>
          <p>
            Telefone: <span>{servico?.profissional?.telefone}</span>
          </p>
          <p>
            Área de atuação: <span>{servico?.profissional?.areaAtuacao}</span>
          </p>
          <p>
            Registro: <span>{servico?.profissional?.registro}</span>
          </p>
          <hr />
          <h1>Agendar Serviço</h1>
          <p>Escolha a forma de pagamento</p>
          <select id="slc-pagamento">
            <option value="pix">Pix</option>
          </select>
          <p>Total: R$ {servico?.valor}</p>
          <Button
            type="button"
            id="btn-contrato"
            onClick={() => agendar(idServico)}
            value="Contratar"
          />
        </div>
      </div>

      {viewModal ? <ModalCadastroEndereco /> : null}
    </>
  );
}

export default Agendamento;
