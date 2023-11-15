import React from "react";

import { useState, useEffect } from "react";

function Logoff() {
    
        useEffect(() => {
            if(sessionStorage.getItem("token") == null) {
                window.location.href = "/login";
            }
        })
    
        const deslogar = () => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("nome");
            window.location.href = "/login";
        }
    

    return (
        <>
        <div className="container-log">
        <h1>Logoff</h1>
        <a onClick={deslogar}>Deslogar</a>
        </div>
        </>
    )

}

export default Logoff;

    