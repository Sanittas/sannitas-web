import axios from "axios";

// const api = axios.create({ baseURL: "http://3.87.179.67:8080/"});

// //Servico-Empresa
// const api8080 = axios.create({ baseURL: "http://3.87.179.67:8080/"});

// //Usuario
// const api8081 = axios.create({ baseURL: "http://3.87.179.67:8081/"});


//Servico-Empresa
const apiEmpresas = axios.create({
    baseURL: "https://sanittas.zapto.org/", headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
    }
});


//Auth    
const apiAuth = axios.create({
    baseURL: "https://sanittas.zapto.org/",
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
    }
});

//Usuario
const apiUsuarios = axios.create({
    baseURL: "https://sanittas.zapto.org/",
    headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token")
    }
});

export { apiAuth, apiUsuarios, apiEmpresas};
