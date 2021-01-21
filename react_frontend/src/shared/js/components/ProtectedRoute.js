import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../utils";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const storageUser = getUser();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (storageUser) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
