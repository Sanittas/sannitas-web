import React from "react";

import { Outlet, Link } from "react-router-dom";

import "../css/navbar.css";

import logo from "../assets/icons-sanittas/white-bottomless.svg";


function Navbar(props) {
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
      <nav className="navbar">
        <a href="#" className="icon-menu" onClick={toggleMenu}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"></img>
        </a>
        <Link to={"/"} className="logo">
          <img src={logo} />
        </Link>

        <ul className="nav-full">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
           <Link to={"/servicos/"}> Serviços</Link>
          </li>
          <li>
            {window.location.pathname == "/" ? (<a href="#sobre">Sobre</a>
            ) : (
              <a href="#sobre" hidden>Sobre</a>
            )}
            
          </li>
          <li>
            <Link className="btn-action" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="btn-action" to="/cadastro">
              Cadastro
            </Link>
          </li>

          <Outlet />
        </ul>

        <ul className="side-nav">
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
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/cadastro"}>Cadastro</Link>
          </li>
        </ul>
      </nav>

      <div className="navbar2">a</div>
    </>
  );
}

export default Navbar;
