import React from "react";

import "../css/card.css";

function Card(props) {
  return (
    <>
      <div className="card">
        <img src={props.image} alt={props.alt} />
        <h2>{props.title}</h2>
        <a>{props.d1}</a>
        <a>{props.d2}</a>
        <a>{props.d3}</a>
      </div>
    </>
  )
}

export default Card;