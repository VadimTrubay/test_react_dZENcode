import React from "react";
import {NavLink} from "react-router-dom";
import {LoginButton} from "../LoginButton/LoginButton";
import {RegisterButton} from "../RegisterButton/RegisterButton";
import styles from "./AuthNav.module.css";
import {RouterEndpoints} from "../../config/routes";

const AuthNav: React.FC = () => {
  return (
    <div>
      <NavLink className={styles.nav_link} to={RouterEndpoints.signup}>
        <RegisterButton/>
      </NavLink>
      <NavLink className={styles.nav_link} to={RouterEndpoints.login}>
        <LoginButton/>
      </NavLink>
    </div>
  );
};

export default AuthNav;
