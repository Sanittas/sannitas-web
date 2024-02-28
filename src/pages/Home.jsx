import React from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import CardEmpresa from "../components/CardEmpresa";
import CardNoticia from "../components/CardNoticia";
import Footer from "../components/Footer";
import Button from "../components/Button";

import "../css/home.css";

import img1 from "../assets/emergencia.png";
import img2 from "../assets/estetoscopio.png";
import img3 from "../assets/ambulancia.png";

import missao from "../assets/missao.png";
import visao from "../assets/marketing-on-line.png";
import valores from "../assets/valor.png";

import somos from "../assets/Untitled-1.jpg"
import NavbarPosLogin from "../components/NavBarPosLogin";


function Home() {
  return (
    <>
      {sessionStorage.getItem("token") ? <NavbarPosLogin /> : <Navbar />}
      <div className="container">
      <header id="home">
        <div className="text-header">
          <h1>O cuidado que você precisa, no conforto do seu lar.</h1>

          <p>
          Na Sanittas, entendemos que cuidar da sua saúde é uma prioridade, e acreditamos que o conforto do seu lar é o melhor lugar para receber os cuidados de que você necessita. Com o nosso serviço de home care, oferecemos uma abordagem personalizada e compassiva para atender às suas necessidades específicas, garantindo que você receba o cuidado adequado, sem precisar sair de casa.
          </p>

          <Button
            type="button"
            id="btn-saiba-mais"
            onClick={() => window.location.href = "/servicos"}  
            value="Conheça nossos serviços"
            class="btn-saiba-mais"
          />

        </div>

        <div className="img-header">
        </div>
      </header>

      

        <div className="cards">
          <Card
            image={img1}
            alt="Emergência"
            title="Internação Domiciliar"
            d1="Avaliação multidisciplinar"
            d2="Plano de atenção"
            d3="Tratamento Específico"
          />
          <Card
            image={img2}
            alt="Estetoscópio"
            title="Assistência Domiciliar"
            d1="Curativos"
            d2="Medicare"
            d3="Cuidador"
          />
          <Card
            image={img3}
            alt="Ambulância"
            title="Emergências Médicas"
            d1="Remoções"
            d2="Cobertura"
            d3="Transporte"
          />
        </div>

        <div class="sobre" id="sobre">
          <div class="img-sobre">
            <img src={somos} alt="Imagem aleatória" />
          </div>

          <div className="text-sobre">
            <h2>Quem Somos</h2>
            <p>
              Fundada com a visão de redefinir os cuidados de saúde no conforto
              do lar, a Sanittas emerge como uma empresa no setor de home
              care. Combinando a compaixão de profissionais dedicados e a
              eficiência das mais recentes inovações médicas, a Sanittas está
              mudando a maneira como as pessoas recebem cuidados médicos.
            </p>
          </div>
        </div>

        <div class="valores">
          <CardEmpresa
            image={missao}
            alt="Imagem aleatória"
            title="MISSÃO"
            d1="Ser a principal plataforma de home care de referência no Brasil, reconhecida pela qualidade, inovação e excelência no atendimento."
          />

          <CardEmpresa
            image={visao}
            alt="Imagem aleatória"
            title="VISÃO"
            d1="Oferecer atendimento domiciliar de qualidade e humanizado, promovendo a saúde e o bem-estar dos pacientes e de seus familiares."
          />

          <CardEmpresa
            image={valores}
            alt="Imagem aleatória"
            title="VALORES"
            d1="Oferecer atendimento domiciliar de qualidade, humanizado e inovador, para promover a saúde e o bem-estar dos pacientes e de seus familiares."
          />
        </div>

        <div class="noticias-title">
          <h1>Noticias</h1>
        </div>

        <div class="noticias">
              <CardNoticia/>
          </div>
          
      </div>
      <Footer />

      
      
    </>
  );
}

export default Home;
