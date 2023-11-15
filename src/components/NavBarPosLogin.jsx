import React from "react";

import { useState, useEffect } from "react";

import { Outlet, Link } from "react-router-dom";

import "../css/navbar.css";

import logo from "../assets/icons-sanittas/white-bottomless.svg";



function NavbarPosLogin(props) {

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      window.location.href = "/login";
    }
  });


  const deslogar = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("nome");
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
            <Link to="/servicos">Serviços</Link>
          </li>
          <li>
            <Link to="/#sobre">Sobre</Link>
          </li>
          <li>
            {sessionStorage.getItem("razaoSocial") ? <Link to={`/empresa/${sessionStorage.getItem("idEmpresa")}`}>Empresa</Link> : <Link to="/cliente">Cliente</Link>}
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
            <Link to={"/sobre"}>Sobre</Link>
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
