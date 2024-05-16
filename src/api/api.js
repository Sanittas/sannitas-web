import axios from "axios";

// const api = axios.create({ baseURL: "http://3.87.179.67:8080/"});

// //Servico-Empresa
// const api8080 = axios.create({ baseURL: "http://3.87.179.67:8080/"});

// //Usuario
// const api8081 = axios.create({ baseURL: "http://3.87.179.67:8081/"});

const api = axios.create({ baseURL: "http://localhost:8080/"});

//Servico-Empresa
const api8080 = axios.create({ baseURL: "http://localhost:8080/", headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

//Usuario
const api8081 = axios.create({ baseURL: "http://localhost:8081/", headers: { "Access-Control-Allow-Origin": "*" }});


const api8081WToken = axios.create({ baseURL: "http://localhost:8081/", 
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

    const api8082WToken = axios.create({ baseURL: "http://localhost:8082/", 
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
        }});



export { api, api8080, api8081, api8082WToken, api8081WToken};
