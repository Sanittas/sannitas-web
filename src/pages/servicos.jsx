import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import CardServico from "../components/CardServico";
import {api, api8080} from "../api/api";
import { api8081 } from "../api/apiToken";
import "../css/cliente.css";
import Swal from "sweetalert2";
import { DisplaySettings } from "@mui/icons-material";

function Servicos(props) {
  const { idUsuario } = useParams(); 

  const [servicos, setServicos] = useState([]);
  
  

  useEffect(() => {
    const getServicos = async () => {
      try {
        const response = await api8080.get(
          `/servicos/servico-empresa/categoria/` // path rota api
        );
        console.log("AQUI");
        console.log(response.data);
        setServicos(response.data);
      } catch (err) {
        console.log("AQUI ó ERRO");
        console.log(err);
      }
    }

    getServicos();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    
  };

  return (
    <>
      <NavbarPosLogin />

      
      
      {
        servicos.map((servico, index) => {
          
          {console.log("ID: " + servico.servicoEmpresa[0].id)}
          {console.log("tempo: " + servico.servicoEmpresa[0].duracaoEstimada)}
          {console.log("Equipe: " + servico.servicoEmpresa[0].equipeResponsavel)}
          {console.log("Valor: " + servico.servicoEmpresa[0].valorServico)}
          {console.log("IDEMPRESA: " + servico.servicoEmpresa[0].empresa.id)}
          {console.log("DESCRiÇÃO: " + servico.descricao)}
          {console.log("AREASAUDE: " + servico.categoriaServico.areaSaude)}

          <React.Fragment key={index}>
          <h1> olha AQUI</h1>

          <CardServico
          id = {servico.servicoEmpresa[0].id} 
          tempo = {servico.servicoEmpresa[0].duracaoEstimada}
          equipeResponsavel = {servico.servicoEmpresa[0].equipeResponsavel}
          valor = {servico.servicoEmpresa[0].valorServico}
          idEmpresa = {servico.servicoEmpresa[0].empresa.id}
          descricao = {servico.descricao}
          area = {servico.categoriaServico.areaSaude}
          />
          
          </React.Fragment>
          
        })
      }
      
      
    </>
  );
}

export default Servicos;
