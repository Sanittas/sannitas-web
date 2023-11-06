import React from "react";

import apiIBGE from "../api/apiIBGE";

import "../css/cardNoticas.css";

function CardNoticia(props) {

    const [noticias, setNoticias] = React.useState([]);
    
    function listarNoticias() {
        apiIBGE.get()
        .then((response) => {
            console.log(response.data.items);
            setNoticias(response.data.items);
        }).catch((error) => {
            console.log(error);
        });
    }

    React.useEffect(() => {
        listarNoticias();
    }, []);

    return (
        <>
            {
                noticias.slice(0,3).map((item) => (
                    <div id={item.id} className="cardNoticia">
                        <h2>{item.titulo}</h2>
                        <p>{item.introducao}</p>
                        <button><a href={item.link} target="_blank">Ver Mais</a></button>
                    </div>
                ))
            }
        </>
    )

    

    
    
    
    
    
}

export default CardNoticia;