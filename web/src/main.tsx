import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-right"
      hideProgressBar
      autoClose={3000}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      theme="dark"
    />
    <App />
  </React.StrictMode>
);
