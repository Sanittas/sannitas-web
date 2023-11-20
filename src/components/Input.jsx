import React from "react";

import { useState } from "react";

import "../css/input.modules.css"

function Input(props) {


    const [value, setValue] = useState(props.value);

    const handleInput = (e) => {
        setValue(e.target.value);
    }

    return(
        <>
            <input type={props.type} placeholder={props.placeholder} id={props.id} value={value} onChange={handleInput} />
        </>
    )
}

export default Input;