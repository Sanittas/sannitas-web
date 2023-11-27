import React from "react";
import Button from "./Button";
function CardServico(props) {

    function contratar(idServico) {
        // api.post(`/servico-empresa`)
    }

    return (
        <>
            <div class="card-servico">
                <div class="card-conteudo">
                    <h2>{props.areaSaude}</h2>
                    <h4>{props.titulo}</h4>
                    <p>{props.descricao}</p>
                    <span>{props.valor}</span> <span>{props.duracaoEstimada}</span>
                    <Button
                        type="button"
                        id="btn-contrato"
                        onClick={contratar(props.id)}
                        value="Contratar" />
                </div>
            </div>
        </>
    );
}

export default CardServico;