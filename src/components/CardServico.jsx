import React from "react";
import Button from "./Button";
import "../css/contratar.css"

function CardServico(props) {

    sessionStorage.setItem("idServico", props.id);

    console.log(props);
    function contratar(idServico) {
        window.location.href = `/agendamento/${idServico}`;
    }

    return (
        <>
            <div class="card-servico">
                {/* <div><h1>AQUI</h1></div> */}
                <div class="card-conteudo">
                    <h2>{props.area}</h2>
                    <h4>{props.descricao}</h4>
                    <span>{props.valor}</span> <span>{props.tempo}</span>
                    <span>{props.equipeResponsavel}</span>
                    <Button
                        type="button"
                        id="btn-contrato"
                        onClick={() => contratar(props.id)}
                        value="Contratar" />
                </div>
            </div>
        </>
    );
}

export default CardServico;