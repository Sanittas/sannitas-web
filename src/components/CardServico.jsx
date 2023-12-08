import React from "react";
import Button from "./Button";
import "../css/cardServico.css"

function CardServico(props) {

    sessionStorage.setItem("idServico", props.id);

    console.log(props);
    function contratar(idServico) {
        if(!sessionStorage.getItem("token")){
            window.location.href = "/login";
        }else {
            window.location.href = `/agendamento/${idServico}`;
        }
        
    }

    return (
        <>
            <div className="card-servico">
                <div className="card-servico-header">
                    <h3>{props.area}</h3>
                </div>
                <div className="card-servico-body">
                    <p>{props.descricao}</p>
                    <p>Valor: R$ {props.valor}</p>
                    <p>Tempo estimado: {props.tempo} minutos</p>
                    <p>Equipe responsável: {props.equipeResponsavel}</p>
                </div>
                <div className="card-servico-footer">
                    <Button
                        id="btn-contratar"
                        onClick={() => contratar(props.id)}
                        value="Contratar"
                        type="button"
                    >
                        Contratar
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CardServico;