import React from "react";

import { useState } from "react";

import "../css/input.modules.css";

import mascara from "../api/mascara";

function Input(props) {
  const [value, setValue] = useState(props.value);

  const handleInput = (e) => {
    setValue(e.target.value);
    if (props.mask == "cpf") {
      setValue(mascara.mascaraCpf(e.target.value));
    }
    if (props.mask == "cnpj") {
      setValue(mascara.mascaraCnpj(e.target.value));
    }
    if (props.mask == "telefone") {
      setValue(mascara.mascaraTelefone(e.target.value));
    }
  };

  return (
    <>
      <label for={props.id}>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={value}
        onChange={handleInput}
        maxLength={props.max}
      />
    </>
  );
}

export default Input;
