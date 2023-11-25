import React from "react";

import { Outlet, Link } from "react-router-dom";

import "../css/navbarDash.css";

import logo from "../assets/icons-sanittas/white-bottomless.svg";

function NavbarDash(props) {
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
        <button class="icon-menu" onClick={toggleMenu} aria-label="Menu">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png" alt="Menu Icon"></img>
        </button>
        <Link to={"/"} className="logo">
          <img src={logo} alt="Sani" />

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
          <Outlet />
        </ul>

        <ul class="side-nav">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </nav>


      <div class="navbar2">a</div>
    </>
  );
}

export default NavbarDash;
