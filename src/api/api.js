import axios from "axios";

const api = axios.create({ baseURL: "http://3.87.179.67:8080/"});

//Servico-Empresa
const api8080 = axios.create({ baseURL: "http://3.87.179.67:8080/"});

//Usuario
const api8081 = axios.create({ baseURL: "http://3.87.179.67:8081/"});

// const api = axios.create({ baseURL: "http://localhost:8080/"});

// //Servico-Empresa
// const api8080 = axios.create({ baseURL: "http://localhost:8080/"});

// //Usuario
// const api8081 = axios.create({ baseURL: "http://localhost:8081/"});



export { api, api8080, api8081};
