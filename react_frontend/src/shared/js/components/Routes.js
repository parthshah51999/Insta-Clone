import React from "react";
import { Route, Redirect } from "react-router-dom";
import ProtectedRoute from "../../js/components/ProtectedRoute";

const { lazy } = React;

const Home = lazy(() => import("../../../containers/Home"));
const SignUp = lazy(() => import("../../../components/SignUp/SignUp"));
const Login = lazy(() => import("../../../components/Login/Login"));
const Profile = lazy(() => import("../../../containers/Profile"));
const Logout = lazy(() => import("../../../components/Logout/Logout"));
const CreatePost = lazy(() =>
  import("../../../components/CreatePost/CreatePost")
);

const Routes = () => {
  return (
    <>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/createpost" component={CreatePost} />
      <ProtectedRoute
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" />;
        }}
      />
    </>
  );
};

export default Routes;
