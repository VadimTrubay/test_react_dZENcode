import React from "react";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import styles from "./Logo.module.css";

const Logo: React.FC = () => {
  return (
    <div className={styles.container}>
      <AdbIcon className={styles.icon}/>
      <NavLink className={styles.nav_link} to="/">
        <Typography className={styles.typography}>
          dZENcode
        </Typography>
      </NavLink>
    </div>
  );
};

export default Logo;
