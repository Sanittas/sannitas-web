import axios from "axios";

const api8080 = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});

const api8081 = axios.create({
  baseURL: "http://localhost  :8081/",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});

const api8082 = axios.create({
  baseURL: "http://localhost:8082/",
  headers: {
    Authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});

export { api8080, api8081, api8082 };
