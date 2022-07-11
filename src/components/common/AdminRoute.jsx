import React from "react";
import auth from "../../services/authService";
import {Route, Redirect} from "react-router-dom";

const AdminRoute = ({component: Component, render, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()?.isAdmin)
          return (
            <Redirect
              to={{
                pathname: "/admin/signin",
                state: {from: props.location},
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default AdminRoute;
