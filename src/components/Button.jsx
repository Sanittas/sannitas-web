import React from "react";

import { useState } from "react";

import { Component } from "react";

import "../css/button.modules.css"

function Button(props) {
    

    const [value, setValue] = useState(props.value);

    const handleInput = (e) => {
        setValue(e.target.value);
    }
    

    return(
        <>
            <button type={props.type} id={props.id} onClick={props.onClick} onChange={handleInput}>
                {value}
            </button>
        </>
    )
}

export default Button;