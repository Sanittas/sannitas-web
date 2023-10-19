import React from "react";

import "../css/cardEmpresa.css";

function CardEmpresa(props) {
  return (
    <>
      <div className="cardEmpresa">
        <img src={props.image} alt={props.alt} />
        <h2>{props.title}</h2>
        <p>{props.d1}</p>
      </div>
    </>
  )
}

export default CardEmpresa;