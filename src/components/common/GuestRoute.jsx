import React from "react";
import auth from "../../services/authService";
import {Route, Redirect} from "react-router-dom";

const GuestRoute = ({component: Component, render, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()?.isGuest)
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {from: props.location},
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default GuestRoute;
