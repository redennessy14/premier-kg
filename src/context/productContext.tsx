import React, { createContext, useReducer, useState } from "react";
import { ActionI } from "./helper";
import axios from "axios";
import { toast } from "react-toastify";
import { SeriesI } from "../pages/CreateSeries/CreateSeries";

interface ProductsContextI {
  categories: CategoryI[];
  series: SeriesI[];
  createCategory: (category: CategoryI) => void;
  getCategories: () => void;
  getSeries: any;
  createSeries: (product: SeriesI, navigate: (path: string) => void) => void;
  deleteSeries: (id: number) => void;
  getSeriesById: any;
  getCategoryByName: any;
  editSeries: any;
  oneSeries: any;
  editCategory: any;
  oneCategory: any;
  deleteCategory: (name: string) => void;
  addComment: any;
}

export const productsContext = createContext<ProductsContextI>(
  {} as ProductsContextI
);

const INIT_STATE = {
  series: [],
  oneSeries: {},
  oneCategory: {},
  pages: 0,
  categories: [],
  productDetails: null,
};

interface CategoryI {
  name: string;
  // id: number;
}

const getConfig = () => {
  const tokens = JSON.parse(localStorage.getItem("tokens") as string);
  const Auth = `Bearer ${tokens.access}`;
  return {
    headers: {
      Authorization: Auth,
    },
  };
};

const API = "http://35.198.162.176/api/v1";

function reducer(state = INIT_STATE, action: ActionI) {
  switch (action.type) {
    case "GET_SERIES":
      return {
        ...state,
        series: action.payload.results,
        // pages: Math.ceil(action.payload.count / 6),
      };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_ONE_SERIES":
      return { ...state, oneSeries: action.payload };
    case "GET_ONE_CATEGORY":
      return { ...state, oneCategory: action.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const { data } = await axios(`${API}/series/category/`, getConfig());
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSeriesById = async (id: any) => {
    try {
      const { data } = await axios(`${API}/series/${id}`);
      dispatch({
        type: "GET_ONE_SERIES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryByName = async (name: string) => {
    try {
      const { data } = await axios(
        `${API}/series/category/${name}/`,
        getConfig()
      );
      dispatch({
        type: "GET_ONE_CATEGORY",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (category: CategoryI) => {
    try {
      await axios.post(`${API}/series/category/`, category, getConfig());
    } catch (error) {
      console.log(error);
    }
  };

  const createSeries = async (
    series: SeriesI,
    navigate: (val: string) => void
  ) => {
    try {
      const {
        data: { title },
      } = await axios.post(`${API}/series/`, series, getConfig());
      toast.success(`Сериал ${title} создан`);
      navigate("/series");
    } catch (err) {
      console.log(err);
    }
  };

  const getSeries = async () => {
    try {
      const { data } = await axios(`${API}/series/`);

      dispatch({
        type: "GET_SERIES",
        payload: data,
      });
    } catch (error) {
      console.log(error, "err");
    } finally {
      // setLoading(false);
    }
  };

  const deleteSeries = async (id: number) => {
    try {
      await axios.delete(`${API}/series/${id}/`, getConfig());
    } catch (error) {
      console.log(error);
    }
  };

  const editSeries = async (series: any, id: any) => {
    try {
      await axios.patch(`${API}/series/${id}/`, series, getConfig());
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (category: string, name: string) => {
    try {
      await axios.patch(
        `${API}/series/category/${category}/`,
        name,
        getConfig()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (name: string) => {
    try {
      await axios.delete(`${API}/series/category/${name}/`, getConfig());
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    try {
      await axios.post(`${API}/series/comments/`, getConfig());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productsContext.Provider
      value={{
        categories: state.categories,
        series: state.series,
        oneSeries: state.oneSeries,
        oneCategory: state.oneCategory,
        createCategory,
        getCategories,
        createSeries,
        getSeries,
        deleteSeries,
        getSeriesById,
        editSeries,
        deleteCategory,
        getCategoryByName,
        editCategory,
        addComment,
      }}
    >
      {" "}
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
