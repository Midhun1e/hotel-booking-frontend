import React from "react";
import auth from "../../services/authService";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        auth.getCurrentUser()?.isAdmin ? (
          Component ? <Component /> : render()
        ) : (
          <Navigate to="/admin/signin" replace state={{ from: rest.location }} />
        )
      }
    />
  );
};


export default AdminRoute;
