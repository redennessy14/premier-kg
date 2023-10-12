import React from "react";
import { BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

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
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<Home />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default Routing;
