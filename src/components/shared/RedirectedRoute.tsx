import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getCurrentUser } from "../../services/authService";
import { TO_HOME } from "../../utils/constant";

interface Props {
  component: typeof React.Component;
  AppProps: object;
  path: string;
  exact: boolean;
}

const RedirectedRoute: React.FC<Props> = ({
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
        user ? <Redirect to={TO_HOME} /> : <C {...props} {...AppProps} />
      }
    />
  );
};

export default RedirectedRoute;
