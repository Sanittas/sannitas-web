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
    api.get(`servicos/`).then((response) => {
        
        setServicos(response.data); 
    
    }).catch(() => {
      console.log("deu erro");
    });
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
            id = {servico.idServico} 
            titulo = {servico.titulo}
            descricao = {servico.descricao}
            valor = {servico.valor}
            area = {servico.areaSaude}
            tempo = {servico.duracaoEstimada}
            />
        })
      }
      
    </>
  );
}

export default Servicos;
