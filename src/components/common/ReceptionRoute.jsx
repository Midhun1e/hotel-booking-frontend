import React from "react";
import auth from "../../services/authService";
import {Route, Redirect} from "react-router-dom";

const ReceptionRoute = ({component: Component, render, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.getCurrentUser()?.isReception)
          return (
            <Redirect
              to={{
                pathname: "/reception/signin",
                state: {from: props.location},
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ReceptionRoute;
