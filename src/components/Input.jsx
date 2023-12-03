import React, { useState, useEffect } from "react";
import "../css/input.modules.css";
import mascara from "../api/mascara";

function Input(props) {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value);
    }
  }, [props.value]);

  const handleInput = (e) => {
    let inputValue = e.target.value;

    if (props.mask === "cpf") {
      inputValue = mascara.mascaraCpf(inputValue);
    } else if (props.mask === "cnpj") {
      inputValue = mascara.mascaraCnpj(inputValue);
    } else if (props.mask === "telefone") {
      inputValue = mascara.mascaraTelefone(inputValue);
    }

    setInternalValue(inputValue);

    if (props.onChange) {
      props.onChange(inputValue);
    }
  };

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        value={internalValue}
        onChange={handleInput}
        maxLength={props.max}
        disabled={props.disabled}
      />
    </>
  );
}

export default Input;
