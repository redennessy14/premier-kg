import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

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
    </Routes>
  );
};

export default Routing;
