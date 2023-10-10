import React from "react";

import "./App.css";
import ProductsContextProvider from "./context/productContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./Routing";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ProductsContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </ProductsContextProvider>
  );
}

export default App;
