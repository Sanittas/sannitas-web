import React from "react";
function CardServico(props) {

    function contratar(idServico) {
        // requisição enviado o idServico no pathVariable
    }

    return (
        <>
            <div class="card-servico">
                <div class="card-conteudo">
                    <h2>{props.areaSaude}</h2>
                    <h4>{props.titulo}</h4>
                    <p>{props.descricao}</p>
                    <span>{props.valor}</span> <span>{props.duracaoEstimada}</span>
                    <button onClick={contratar(props.id)}></button>
                </div>
            </div>
        </>
    );
}

export default CardServico;