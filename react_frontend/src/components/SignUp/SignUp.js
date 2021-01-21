import React, { useState, useContext } from "react";
import classNames from "classnames";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import get from "lodash/get";
import { signUp } from "../../shared/api/api";
import { UserContext } from "../../shared/api/contexts";
import styles from "../../shared/styles/auth.module.scss";

const SignUp = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const cardClass = classNames("card", styles.cardStyle);
  const buttonClass = classNames(
    "btn waves-effect waves-light",
    styles.buttonMargin
  );

  const onChange = (callback, e) => {
    const value = get(e, "target.value");
    callback(value);
  };

  const doSignUp = () => {
    const credentials = { email, password, name };
    signUp(credentials)
      .then((data) => {
        const error = get(data, "data.error");
        if (error) {
          return toast.error(error);
        }
        const message = get(data, "data.message");
        toast.success(`${message} Please login to continue`);
        history.push("/login");
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
          placeholder="name"
          onChange={onChange.bind(this, setName)}
          value={name}
        />
        <input
          type="email"
          placeholder="email"
          onChange={onChange.bind(this, setEmail)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={onChange.bind(this, setPassword)}
          value={password}
        />
        <button className={buttonClass} onClick={doSignUp}>
          Sign Up
        </button>
        <div className={styles.buttonMargin}>
          Already have an account? <NavLink to="/login">Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
