import axios from "axios";

// const api = axios.create({ baseURL: "http://elb-sanittas-web-app-1514252692.us-east-1.elb.amazonaws.com/usuarios/"});

const api = axios.create({ baseURL: "http://localhost:8080/",
 headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
 }});



export default api;