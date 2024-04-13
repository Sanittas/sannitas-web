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
import axios from "axios";

import { loadMercadoPago } from "@mercadopago/sdk-js";

import { Payment, MercadoPagoConfig } from "mercadopago";

// import DateTimePicker from "react-datetime-picker";
// import "react-datetime-picker/dist/DateTimePicker.css";
// import "react-calendar/dist/Calendar.css";
// import "react-clock/dist/Clock.css";
dayjs.locale("pt-br");
function Agendamento() {
  loadMercadoPago();
  const mp = new MercadoPagoConfig("TEST-2276921b-bae1-47b1-b05e-82c9e6b3b019")
  const idServico = sessionStorage.getItem("idServico");
  const idUsuario = sessionStorage.getItem("id");
  const [value, setValue] = useState(new Date());
  const [endereco, setEndereco] = useState([]);
  const [usuario, setUsuario] = useState();
  const [servico, setServico] = useState();

  useEffect(() => {
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

  // const handleBotaoClick = () => {
  //   endereco ? setViewModal(true) : setViewModal(false);
  // };

  // const client = new MercadoPagoConfig({
  //   accessToken:
  //     "APP_USR-1461285240365389-041212-a6b30b0222df26656b3536d338ec3dc9-825045004",
  // });
  // const payment = new Payment(client);

  const apiMP = axios.create({
    baseURL: "https://api.mercadopago.com",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_MP}`,
      "X-Idempotency-Key" : "0d5020ed-1af6-469c-ae06-c3bec19954bb"
    },
  });

  // mp.interceptors.request.use(async (config) => {
  //   const token = process.env.REACT_APP_TOKEN_MP
  //   config.headers.Authorization = `Bearer ${token}`;
  //   config.headers["Access-Control-Allow-Origin"] = "*";
  //   config.headers["Access-Control-Allow-Credentials"] = "true";
  //   config.headers["Access-Control-Allow-Methods"] = "PUT, GET, POST, DELETE, OPTIONS";
  //   config.headers["Access-Control-Allow-Headers"] = "Content-Type";
  //   return config;
  // });

  function agendar(id) {
    setViewModal(false);
    if (endereco) {
      var cpf = usuario?.cpf;
      var email = usuario?.email;
      var pagamento = document.getElementById("slc-pagamento").value;
      const body = {
        transaction_amount: 0.5,
        description: "Teste",
        payment_method_id: "pix",
        payer: {
          email: "paulo@gmail.com",
          identification: {
            type: "CPF",
            number: "48664158860",
          },
        },
      };

      apiMP.post("/v1/payments", body)
        .then((res) => {
          console.log(res);

          api8080
            .post(`/agendamentos/`, {
              dataAgendamento: format(value, "yyyy-MM-dd HH:mm:ss"),
              idServico: idServico,
              idUsuario: idUsuario,
            })
            .then((res) => {
              console.log(res);

              Swal.fire({
                icon: "success",
                title: "Agendamento realizado com sucesso!",
                showConfirmButton: true,
                timer: 5000,
              });

              // window.location.href = `/cliente/${idUsuario}`;
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: "error",
                title: "Erro ao realizar agendamento!",
                showConfirmButton: true,
                timer: 2500,
              });

              window.location.reload();
            });

          Swal.fire({
            icon: "success",
            title: "Será redirecionado para o pagamento!",
            showConfirmButton: true,
            timer: 4000,
          });

          setTimeout(() => {
            window.location.href =
              res.point_of_interaction.transaction_data.ticket_url;
          }, 2500);
        })
        .catch((err) => {
          console.log(err);

          Swal.fire({
            icon: "error",
            title: "Erro ao realizar pagamento! Tente novamente",
            showConfirmButton: true,
            timer: 2500,
          });
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
