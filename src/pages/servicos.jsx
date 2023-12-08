import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Navbar from "../components/Navbar";
import CardServico from "../components/CardServico";
import {api8080} from "../api/api";
import "../css/servicos.css";

function Servicos(props) {
  const { idUsuario } = useParams();

  const [servicos, setServicos] = useState([]);



  useEffect(() => {
    const getServicos = async () => {
      try {
        const response = await api8080.get(
          `/servicos/servico-empresa/categoria/` // path rota api
        );
        
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

  console.log(servicos);

  return (
    <>
    
      {sessionStorage.getItem("token") ? <NavbarPosLogin /> : <Navbar />}
      <div className="container-servicos-contratar">
      { 
        servicos.map((servico, i) => ( 
          
          <CardServico
            area={servico.categoriaServico.areaSaude}
            descricao={servico.descricao}
            valor={servico.servicoEmpresa[0].valorServico}
            tempo={servico.servicoEmpresa[0].duracaoEstimada}
            equipeResponsavel={servico.servicoEmpresa[0].equipeResponsavel}
            id={servico.servicoEmpresa[0].id}
            key={i}
          />
        ))
      }
      </div>

      
      
      
    </>
  );
}


export default Servicos;
