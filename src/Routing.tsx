import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register/Register";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

// const PrivateRoutes = () => {
//   const user = localStorage.getItem("email");

//   return user ? (
//     <div>
//       <Outlet />
//     </div>
//   ) : (
//     <Navigate to="/sign-in" />
//   );
// };

const Routing = () => {
  return (
    <Routes>
      {" "}
      <Route path="*" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default Routing;
