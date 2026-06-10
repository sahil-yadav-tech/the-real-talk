import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9876/api",
  withCredentials: true,
});

export default API;