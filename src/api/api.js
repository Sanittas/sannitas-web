import axios from "axios";

const api = axios.create({ baseURL: "http://10.0.0.167:8080/"});

//Servico-Empresa
const api8080 = axios.create({ baseURL: "http://10.0.0.167:8080/"});

//Usuario
const api8081 = axios.create({ baseURL: "http://10.0.0.167:8081/"});


export { api, api8080, api8081};
