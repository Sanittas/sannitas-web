import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import CardServico from "../components/CardServico";
import {api} from "../api/api";
import "../css/cliente.css";
import Swal from "sweetalert2";

function Servicos(props) {
  const { idUsuario } = useParams(); 

  const [servicos, setServicos] = useState([]);
  
  

  useEffect(() => {
    getServicosVinculados = async () => {
      try {
        const response = await api8080.get(
          `/servicos-empresas/` // path rota api
        );

        console.log(response.data);
        setServicos(response.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <NavbarPosLogin />
      
      {
        servicos.map(servico => {
            <CardServico
            id = {servico.id} 
            tempo = {servico.duracaoEstimada}
            equipeResponsavel = {servico.equipeResponsavel}
            valor = {servico.valorServico}
            idEmpresa = {servico.idEmpresa}
            idServico = {servico.idServico}
            // descricao = {servico.descricao}
            // area = {servico.areaSaude}
            // titulo = {servico.titulo}
            />
        })
      }
      
    </>
  );
}

export default Servicos;
