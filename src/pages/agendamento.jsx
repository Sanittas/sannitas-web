import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import { api8081 } from '../api/apiToken';

function Agendamento() {
  const idServico = useParams();
  const idUsuario = sessionStorage.getItem("id");
  const [value, onChange] = useState(new Date());
  const [endereco, setEndereco] = useState(new Date());

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/";
    }

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

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default Agendamento;
