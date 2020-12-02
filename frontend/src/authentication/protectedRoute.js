import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import LoadingPage from "../components/pages/loading-page";
import UserContext from "../contexts/userContext";

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  //   if (user.isLoading) {
  //     return <LoadingPage />;
  //   }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
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
}

export default ProtectedRoute;
