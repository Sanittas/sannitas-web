import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/"});

const api8080 = axios.create({ baseURL: "http://localhost:8080/"});

const api8081 = axios.create({ baseURL: "http://localhost:8081/"});


export { api, api8080, api8081};
