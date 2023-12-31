import React from "react";

import { useState } from "react";

import ModalCadastroEndereco from "./ModalCadastroEndereco";

import "../css/button.modules.css"

function Button(props) {
    

    const [value, setValue] = useState(props.value);

    const handleInput = (e) => {
        setValue(e.target.value);
    }
    

    return(
        <>
            <button className={props.class ? props.class : "button-component"} type={props.type} id={props.id} onClick={props.onClick} onChange={handleInput}>
                {value}
            </button>
        </>
    )
}

export default Button;