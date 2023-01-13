/* Pages */
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
};

const Root = () => {
  if (localStorage.getItem("token")) {
    window.location.href = "/users";
  } else {
    window.location.href = "/login";
  }

  return <></>;
};

export default App;
