import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import RedirectedRoute from "./components/shared/RedirectedRoute";
import CourseForm from "./containers/CourseForm";
import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import { TO_SIGNUP, TO_LOGIN, TO_HOME, TO_COURSES } from "./utils/constant";

const Routes = () => {
  return (
    <Switch>
      <RedirectedRoute path={TO_SIGNUP} component={Signup} exact />
      <RedirectedRoute path={TO_LOGIN} component={Login} exact />
      <ProtectedRoute path={TO_HOME} component={Home} exact />
      <ProtectedRoute path={TO_COURSES + "/:id"} component={CourseForm} exact />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
