import axios, { AxiosResponse } from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: "http://localhost:3333",
});

export { api };
