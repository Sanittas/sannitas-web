import React, { useState, useEffect } from 'react';
import "../css/agendamento.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { api8080 } from '../api/api';
import { api8081 } from '../api/apiToken';
import Swal from 'sweetalert2';
import Button from '../components/Button';
import NavbarPosLogin from '../components/NavBarPosLogin';
import { format } from 'date-fns';
import ModalCadastroEndereco from "../components/ModalCadastroEndereco";
import DateTimePicker from 'react-datetime-picker';


function Agendamento() {
  const idServico = sessionStorage.getItem("idServico");
  const idUsuario = sessionStorage.getItem("id");
  const [value, setValue] = useState(new Date());
  const [endereco, setEndereco] = useState([]);

  useEffect((() => {


    const getEndereco = async () => {
      try {
        const response = await api8081.get(`/enderecos/usuarios/${idUsuario}`);
        setEndereco(response.data);

      } catch (err) {
        console.log(err);
      }
    };

    getEndereco();
  }), []);

  const [viewModal, setViewModal] = useState(false);

  // const handleBotaoClick = () => {
  //   endereco ? setViewModal(true) : setViewModal(false);
  // };

  function agendar(id) {

    setViewModal(false)
     console.log("Teste", id)
      console.log(idUsuario)
      console.log(format(value, 'yyyy-MM-dd HH:mm:ss'))

    console.log(idServico)
    console.log(idUsuario)
    console.log(format(value, 'yyyy-MM-dd HH:mm:ss'))

    if (endereco) {
      api8080.post(`/agendamentos/` ,{

        dataAgendamento : format(value, 'yyyy-MM-dd HH:mm:ss'),
        idServico : idServico,
        idUsuario : idUsuario
  
      }).then((res) => {
        console.log(res);
  
        Swal.fire({
          icon: "success",
          title: "Agendamento realizado com sucesso!",
          showConfirmButton: true,
          timer: 5000
        })

        // window.location.href = `/cliente/${idUsuario}`;
  
  
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
    <div className='container-agendamento'>
    <DateTimePicker
    label="Controlled picker"
    value={value}
    onChange={(newValue) => setValue(newValue)}
    />
    

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
