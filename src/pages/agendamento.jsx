import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { api8080 } from '../api/api';
import { api8081 } from '../api/apiToken';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import NavbarPosLogin from '../components/NavBarPosLogin';
import { format } from 'date-fns';
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";


function Agendamento() {
  const idServico = sessionStorage.getItem("idServico");
  const idUsuario = sessionStorage.getItem("id");
  const [value, onChange] = useState(new Date());
  const [endereco, setEndereco] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

    console.log("idServico")
    console.log(idServico)

    const getEndereco = async () => {
      try {
        const response = await api8081.get(`/enderecos/usuarios/${idUsuario}`);
        setEndereco(response.data);

      } catch (err) {
        console.log(err);
      }
    };

    getEndereco();
  });

  const [viewModal, setViewModal] = useState(false);

  // const handleBotaoClick = () => {
  //   endereco ? setViewModal(true) : setViewModal(false);
  // };

  function agendar(id) {

    setViewModal(false)

    if (endereco) {
      api8080.post(`/agendamentos/` ,{

        dataAgendamento : format(value, 'yyyy-MM-dd HH:mm:ss'),
        idServicoEmpresa : idServico,
        idUsuario : idUsuario
  
      }).then((res) => {
        console.log(res);
  
        Swal.fire({
          icon: "success",
          title: "Agendamento realizado com sucesso!",
          showConfirmButton: true,
          timer: 5000
        })
  
        setTimeout(() => {
          window.location.href = `/servicos/${idUsuario}`;
        }, 2500);
  
      }).catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Erro ao realizar agendamento!",
          showConfirmButton: true,
          timer: 1500
        })
  
  
      })
    } else {
      setViewModal(true)
    }
  }

  

  return (
    <>
    <NavbarPosLogin/>
    <div>
      <Calendar onChange={onChange} value={value} />

      <Button
        type="button"
        id="btn-contrato"
        onClick={() => agendar(idServico)}
        value="Contratar" />
    </div>

    {viewModal ? <ModalCadastroEndereco /> : null}
    </>
  );
}

export default Agendamento;
