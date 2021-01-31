import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) => {
        return user.id ? <Component {...props} /> : <Redirect to="/register" />;
      }}
    ></Route>
  );
}
