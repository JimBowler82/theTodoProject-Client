import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const workInProgress = true;
  return (
    <Route
      {...rest}
      render={(props) => {
        return workInProgress ? (
          <Redirect to="/register" />
        ) : (
          <Component {...props} />
        );
      }}
    ></Route>
  );
}
