import React from "react";
import Button from "./Button";
import "../css/cardServico.css"
import Swal from "sweetalert2";

function CardServico(props) {

    sessionStorage.setItem("idServico", props.id);

    console.log(props);
    function contratar(idServico) {
        if(sessionStorage.getItem("id") === null){
            Swal.fire({
                icon: "info",
                title: "Você precisa estar logado para contratar um serviço!",
                showConfirmButton: true,
                timer: 3000,
            });
            
            setTimeout(() => {
                window.location.href = "/login";
            }, 4000);

            
        } else {
            window.location.href = `/agendamento/${idServico}`;
        }
               
    }

    return (
        <>
            <div className="card-servico">
                <div className="card-servico-header">
                    <p>{props.area}</p>
                </div>
                <div className="card-servico-body">
                    <p>Descricao: {props.descricao}</p>
                    <p>Valor: R$ {props.valor}</p>
                    <p>Tempo estimado: {props.tempo} minutos</p>
                    {/* <p>Equipe responsável: {props.equipeResponsavel}</p> */}
                </div>
                <div className="card-servico-footer">
                    <Button
                        id="btn-contratar"
                        onClick={() => contratar(props.id)}
                        value="Contratar"
                        type="button"
                        class="btn-contratar"
                    >
                        Contratar
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CardServico;