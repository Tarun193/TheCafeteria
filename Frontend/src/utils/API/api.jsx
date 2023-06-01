import axios from "axios";
export const BASE_URL = "http://127.0.0.1:8000/static";
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export default API;
