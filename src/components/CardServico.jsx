import React from "react";
import Button from "./Button";
import "../css/contratar.css"

function CardServico(props) {
    console.log("COMPONENTE");
    console.log(props.id);
    console.log(props.tempo);
    console.log(props.equipeResponsavel);
    console.log(props.valor);
    console.log(props.idEmpresa);
    console.log(props.descricao);
    console.log(props.area);


    function contratar(idServico) {
        
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