import axios from "axios";

const apiToken = axios.create({ baseURL: "http://localhost:8081/",
headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token")
    }});

export default apiToken;