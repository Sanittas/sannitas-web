import React from "react";

import Navbar from "./components/Navbar";

function Cadastro(props) {
    return (
        <>
        <Navbar />
        <div className="container-cadastro">
            <div className="form-cadastro">
                <input type="text" placeholder="Nome" />
            </div>

            <div className="img-cadastro">

            </div>
        </div>
        </>
    );
    }

export default Cadastro;