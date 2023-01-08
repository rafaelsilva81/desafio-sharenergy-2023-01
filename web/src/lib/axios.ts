import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  baseURL: import.meta.env.VITE_API_URL,
});

export { api };
