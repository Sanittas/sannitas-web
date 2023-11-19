import React from "react";

import "../css/footer.css";

import img1 from "../assets/instagram.png";
import img2 from "../assets/linkedin.png"; 
import logo from "../assets/icons-sanittas/white-bottomless.svg"
import Swal from "sweetalert2";

function Footer() {

    const contato = () => {
      Swal.fire({
        title: "Entre em contato",
        html: `
                <form>
                    <input id="nome" class="swal2-input" placeholder="Nome">
                    <input id="email" class="swal2-input" placeholder="Email">
                    <input id="mensagem" class="swal2-input" placeholder="Mensagem">
                </form>    
                `,
        showCancelButton: true,
        confirmButtonText: "Enviar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const nome = Swal.getPopup().querySelector("#nome").value;
          const email = Swal.getPopup().querySelector("#email").value;
          const mensagem = Swal.getPopup().querySelector("#mensagem").value;
          if (!nome || !email || !mensagem) {
            Swal.showValidationMessage(`Preencha todos os campos`);
          }
          return {
            nome: nome,
            email: email,
            mensagem: mensagem,
          };
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Mensagem enviada com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      });

    }

    return(
        <>
        <footer>
          <div class="footer-left">
              <img src={logo} alt="" />
          </div>

          <div class="footer-center">
              <a onClick={contato}>Entre em contato</a>
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