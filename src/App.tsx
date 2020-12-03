import React from "react";
import { ToastContainer } from "react-toastify";
import "./Context.tsx";
import Routes from "./routes";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes />
    </>
  );
};

export default App;
