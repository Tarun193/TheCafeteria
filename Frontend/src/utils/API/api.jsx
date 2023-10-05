import axios from "axios";
export const BASE_URL = "";
const API = axios.create({
  baseURL: "https://thecafeteira-865381fdf17d.herokuapp.com/api/",
  headers: {
    "content-type": "application/json",
  },
});

export default API;
