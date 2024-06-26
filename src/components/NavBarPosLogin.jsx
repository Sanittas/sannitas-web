import React from "react";

import { useEffect } from "react";

import sentinela from "../api/sentinela"

import { Outlet, Link } from "react-router-dom";

import "../css/navbar.css";

import logo from "../assets/icons-sanittas/white-bottomless.svg";



function NavbarPosLogin(props) {

  useEffect(() => {
   sentinela();
  });


  const deslogar = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };


  const toggleMenu = () => {
    const sideNav = document.querySelector(".side-nav");

    if (sideNav.classList.contains("show-side-nav")) {
      sideNav.classList.remove("show-side-nav");
      sideNav.classList.add("hide-side-nav");
    } else {
      sideNav.classList.remove("hide-side-nav");
      sideNav.classList.add("show-side-nav");
    }
  };

  return (
    <>
      <nav class="navbar">
        <a href="#" class="icon-menu" onClick={toggleMenu}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"></img>
        </a>
        <Link to={"/"} className="logo">
          <img src={logo} />
        </Link>

        <ul class="nav-full">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
          {sessionStorage.getItem("razaoSocial") ? <Link to={`/empresa/${sessionStorage.getItem("idEmpresa")}/CadastrarServicos`}>Serviços</Link> : <Link to={`/servicos/${sessionStorage.getItem("id")}`}>Serviços</Link>}
          </li>
          <li>
            {window.location.pathname == "/" ? (<a href="#sobre">Sobre</a>
            ) : (
              <a href="#sobre" hidden>Sobre</a>
            )}
            
          </li>
          {/* {
            sessionStorage.getItem("razaoSocial") ? <li>
              <Link to="/dashboard">Dashboard</Link>
            </li> : null
          } */}
          <li>
            {sessionStorage.getItem("razaoSocial") ? <Link to={`/empresa/${sessionStorage.getItem("idEmpresa")}`}>{sessionStorage.getItem("razaoSocial")}</Link> : <Link to={`/cliente/${sessionStorage.getItem("id")}`}>{sessionStorage.getItem("nome")}</Link>}
          </li>
          <li>
            <Link className="btn-action" onClick={deslogar}>
              Logoff
            </Link>
          </li>

          <Outlet />
        </ul>

        <ul class="side-nav">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/servicos"}>Serviços</Link>
          </li>
          <li>
            {window.location.pathname == "/" ? (<a href="#sobre">Sobre</a>
            ) : (
              <a href="#sobre" hidden>Sobre</a>
            )}
            
          </li>
          <li>
            <Link to={`/cliente/${2}`}>Conta</Link>
          </li>
        </ul>
      </nav>

      <div class="navbar2">a</div>
    </>
  );
}

export default NavbarPosLogin;
