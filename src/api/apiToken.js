import axios from "axios";

const apiToken = axios.create({ baseURL: "http://localhost:8080/",
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

export default apiToken;