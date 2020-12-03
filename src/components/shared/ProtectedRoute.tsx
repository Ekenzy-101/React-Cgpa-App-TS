import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import { TO_LOGIN } from "../../utils/constant";

interface Props {
  component: typeof React.Component;
  AppProps: object;
  path: string;
  exact: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: C,
  AppProps,
  path,
  exact,
  ...rest
}) => {
  const user = getCurrentUser();
  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) =>
        !user ? (
          <Redirect
            to={{
              pathname: TO_LOGIN,
              state: props.location.pathname,
              search: `?redirect_to=${encodeURIComponent(
                props.location.pathname
              )}`,
            }}
          />
        ) : (
          <C {...props} {...AppProps} />
        )
      }
    />
  );
};

export default ProtectedRoute;
