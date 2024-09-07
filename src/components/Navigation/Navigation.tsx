import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import styles from "../Navigation/Navigation.module.css";
import {mainUrls} from "../../config/urls";


const Navigation = () => {

  return (
    <div className={styles.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.index}>
          HOME
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.about}>
          ABOUT
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.comments.all}>
          COMMENTS
        </NavLink>
        <NavLink className={styles.nav_link_breadcrumb} to={mainUrls.auth.me}>
          MY PROFILE
        </NavLink>
      </Breadcrumbs>
    </div>
  );
};

export default Navigation;
