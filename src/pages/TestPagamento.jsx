// import React from "react";
// import axios from "axios";

// const apiPM = axios.create({
//     baseURL: "https://api.mercadopago.com"
// })

// apiPM.interceptors.request.use(async (config) => {
//     const token = "APP_USR-1461285240365389-041212-a6b30b0222df26656b3536d338ec3dc9-825045004";
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });


// function TestPagamento() {

    

//     apiPM.post("v1/payments", body).then((response) => {
//         console.log(response.data);
//     })


//     return (
//         <div>
//             <button type="submit">Pagar</button>
//         </div>
//     )
// }

// export default TestPagamento;