import React from "react";

import "./App.css";
import ProductsContextProvider from "./context/productContext";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <ProductsContextProvider>
        <Navbar />
      </ProductsContextProvider>
    </div>
  );
}

export default App;
