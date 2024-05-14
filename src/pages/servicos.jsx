import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Navbar from "../components/Navbar";
import CardServico from "../components/CardServico";
import {api8081WToken} from "../api/api";
import "../css/servicos.css";
import sentinela from "../api/sentinela";

function Servicos(props) {
  const { idUsuario } = useParams();

  const [servicos, setServicos] = useState([]);



  useEffect(() => {
    sentinela();
    const getServicos = async () => {
      try {
        const response = await api8081WToken.get(
          `/servicos/` // path rota api
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
    
      {sessionStorage.getItem("id") || sessionStorage.getItem("idEmpresa") ? <NavbarPosLogin /> : <Navbar />}
      <div className="container-servicos-contratar">
      { 
        servicos.map((servico, i) => ( 
          
          <CardServico
            area={servico.areaSaude}
            descricao={servico.descricao}
            valor={servico.valor}
            tempo={servico.duracaoEstimada}
            // equipeResponsavel={servico.servicoEmpresa[0].equipeResponsavel}
            id={servico.id}
            key={i+1}
          />
        ))
      }
      </div>

      
      
      
    </>
  );
}


export default Servicos;
