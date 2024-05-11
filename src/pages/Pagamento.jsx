import React from "react";
import "../css/pagamento.css";
import sentinela from "../api/sentinela";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NavbarPosLogin from "../components/NavBarPosLogin";
import Button from "../components/Button";
import Swal from "sweetalert2";
function Pagamento() {
  useEffect(() => {
    sentinela();
  }, []);
  const params = useParams("/pagamento/:qrCode/:valor/:id");

  const { qrCode, valor, id } = params;

  
  console.log(valor, id, qrCode);

  let decode = decodeURIComponent(qrCode);

  const validarPagamento = async () => {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer APP_USR-1461285240365389-041212-a6b30b0222df26656b3536d338ec3dc9-825045004`,
      }
    }

    );
    const data = await response.json();
    if (data.status === "approved") {
      Swal.fire({
        icon: "success",
        title: "Pagamento Aprovado",
        text: "Pagamento realizado com sucesso!",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }else if(data.status === "pending"){
        Swal.fire({
            icon: "warning",
            title: "Pagamento Pendente",
            text: "Pagamento ainda não foi aprovado!",
        });
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Pagamento Recusado",
            text: "Pagamento não foi aprovado!",
        });
    }
  };

  return (
    <>
      <NavbarPosLogin />
      <div className="container-pagamento">
        <div className="info-pagamento">
          <h1>Realizar Pagamento</h1>
          <p>Valor: R$ {valor}</p>
          <img
            src={`data:image/png;base64,${decode}`}
            alt="QR Code"
          />
          <Button
            type="button"
            id="btn-pagar"
            class="btn-pagar"
            onClick={validarPagamento}
            value="Pagar"
          />
        </div>
      </div>
    </>
  );
}

export default Pagamento;
