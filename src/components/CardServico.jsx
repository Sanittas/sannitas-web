import React from "react";
function CardServico(props) {
    return (
        <>
            <div class="card-servico">
                <div class="card-conteudo">
                    <h2>{props.areaSaude}</h2>
                    <h4>{props.titulo}</h4>
                    <p>{props.descricao}</p>
                    <span>{props.valor}</span> <span>{props.duracaoEstimada}</span>
                </div>
            </div>
        </>
    );
}

export default CardServico;