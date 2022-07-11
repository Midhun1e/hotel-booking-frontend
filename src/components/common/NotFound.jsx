import React from "react";
import ErrorPage from "react-custom-errors";

function NotFound() {
  return <ErrorPage code="404" link="/" />;
}

export default NotFound;
