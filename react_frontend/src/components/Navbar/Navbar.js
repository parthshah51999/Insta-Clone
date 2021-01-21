import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { UserContext } from "../../shared/api/contexts";
import styles from "./navbar.module.scss";

const navItems = [
  {
    route: "/login",
    title: "Login",
    classString: styles.linkColor,
    isAuthRequired: false,
  },
  {
    route: "/signup",
    title: "Sign Up",
    classString: styles.linkColor,
    isAuthRequired: false,
  },
  {
    route: "/profile",
    title: "Profile",
    classString: styles.linkColor,
    isAuthRequired: true,
  },
  {
    route: "/createpost",
    title: "Create Post",
    classString: styles.linkColor,
    isAuthRequired: true,
  },
  {
    route: "/logout",
    title: "Logout",
    classString: styles.linkColor,
    isAuthRequired: true,
  },
];

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const isAuthenticated = !!user;
  const logoWrapper = classNames(
    "brand-logo",
    styles.brandLogo,
    styles.linkColor
  );

  const getLinks = ({ route, title, classString, isAuthRequired }) => {
    if (isAuthRequired !== isAuthenticated) {
      return null;
    }

    return (
      <li
        key={route}
        className={location && route === location.pathname ? "active" : ""}
      >
        <NavLink to={route} className={classString}>
          {title}
        </NavLink>
      </li>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <NavLink to="/home" className={logoWrapper}>
          Instagram
        </NavLink>
        <ul id="nav-mobile" className="right">
          {navItems.map((navItem) => getLinks(navItem))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
