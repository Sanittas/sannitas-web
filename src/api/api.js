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
const api8081 = axios.create({ baseURL: "http://localhost:8081/", headers: {}});



const api8080WTokenAuth = axios.create({ baseURL: "http://18.206.185.43:8080/", 
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

const api8080WTokenEmpresas = axios.create({ baseURL: "http://54.82.145.138:8080/", 
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

const api8080WTokenUsuarios = axios.create({ baseURL: "http://54.163.104.204:8080/", 
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});


export { api, api8080, api8081, api8080WTokenAuth, api8080WTokenEmpresas, api8080WTokenUsuarios};
