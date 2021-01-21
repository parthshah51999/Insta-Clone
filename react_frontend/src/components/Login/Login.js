import React, { useState, useContext } from "react";
import classNames from "classnames";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { login } from "../../shared/api/api";
import { toast } from "react-toastify";
import get from "lodash/get";
import Constants from "../../shared/js/constants";
import { UserContext } from "../../shared/api/contexts";
import styles from "../../shared/styles/auth.module.scss";

const { ACCESS_TOKEN_KEY, USER_KEY } = Constants;

const Login = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cardClass = classNames("card", styles.cardStyle);
  const buttonClass = classNames(
    "btn waves-effect waves-light",
    styles.buttonMargin
  );

  const onChange = (callback, e) => {
    const value = get(e, "target.value");
    callback(value);
  };

  const doLogin = () => {
    const credentials = { email, password };
    login(credentials)
      .then((data) => {
        const error = get(data, "data.error");
        if (error) {
          return toast.error(error);
        }
        const jwt = get(data, "data.token");
        const user = get(data, "data.user");
        localStorage.setItem(ACCESS_TOKEN_KEY, jwt);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setUser(user);

        history.push("/home");
      })
      .catch((err) => {
        const error = get(err, "response.data.error", "Something went wrong");
        toast.error(error);
      });
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={cardClass}>
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={onChange.bind(this, setEmail)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={onChange.bind(this, setPassword)}
        />
        <button className={buttonClass} onClick={doLogin}>
          Login
        </button>
        <div className={styles.buttonMargin}>
          Do not have an account? <NavLink to="/signup">Sign up.</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
