import React from "react";

import "./App.css";
import ProductsContextProvider from "./context/productContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ProductsContextProvider>
      <AuthContextProvider>
        <ToastContainer />{" "}
        <BrowserRouter>
          <Navbar />
          <Routing />
        </BrowserRouter>
      </AuthContextProvider>
    </ProductsContextProvider>
  );
}

export default App;
