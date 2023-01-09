import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: import.meta.env.VITE_API_URL,
});

// const api = setupCache(instance);

export { instance as api };
