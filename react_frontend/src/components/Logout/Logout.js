import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../shared/api/contexts";
import Constants from "../../shared/js/constants";

const { ACCESS_TOKEN_KEY, USER_KEY } = Constants;

const Logout = () => {
  const { setUser } = useContext(UserContext);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  setUser(null);

  return <Redirect to="/login" />;
};

export default Logout;
