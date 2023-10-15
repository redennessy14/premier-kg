import React from "react";
import { BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import CreateSeries from "./pages/CreateSeries/CreateSeries";
import CreateCategory from "./pages/CreateCategory/CreateCategory";
import Series from "./pages/Series/Series";
import EditSeries from "./pages/EditSeries/EditSeries";
import SeriesDetail from "./pages/SeriesDetail/SeriesDetail";

const PrivateRoutes = () => {
  const user = localStorage.getItem("email");

  return user ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/register" />
  );
};

const Routing = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<Home />} />
        <Route path="/create-series" element={<CreateSeries />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/series" element={<Series />} />
        <Route path="/edit-series/:id" element={<EditSeries />} />
        <Route path="/series-detail/:id" element={<SeriesDetail />} />
      </Route>
    </Routes>
  );
};

export default Routing;
