import React, { createContext, useState } from "react";
import { ActionI } from "./helper";

interface ProductsContextI {}

export const productsContext = createContext<ProductsContextI>(
  {} as ProductsContextI
);

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  productDetails: null,
};

const API = "http://34.173.115.25/api/v1";

function reducer(state = INIT_STATE, action: ActionI) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 6),
      };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_ONE_PRODUCT":
      return { ...state, oneProduct: action.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <productsContext.Provider value={{ loading }}>
      {" "}
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
