import React from "react";

import "../css/footer.css";

import img1 from "../assets/instagram.png";
import img2 from "../assets/linkedin.png"; 
import logo from "../assets/icons-sanittas/white-bottomless.svg"

function Footer() {
    return(
        <>
        <footer>
          <div class="footer-left">
              <img src={logo} alt="" />
          </div>

          <div class="footer-center">
              <a href="">Entre em contato</a>
          </div>

          <div class="footer-right">
              <div class="redes-sociais">
                <p>Contato</p>
              </div>
              <div class="icons-redes">
                <img src={img1} alt="Instagram" />
                <img src={img2} alt="Linkedin" />
              </div>
          </div>

      </footer>
        </>
    )
}

export default Footer;