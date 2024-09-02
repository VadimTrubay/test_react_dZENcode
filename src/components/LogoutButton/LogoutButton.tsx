import React from "react";
import Button from "@mui/material/Button";
import {logOut} from "../../redux/auth/operations";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "../UserMenu/UserMenu.module.css";
import {selectIsLoggedIn} from "../../redux/auth/selectors";

export const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const handleBaseLogout = () => {
    if (isAuthenticated) {
      dispatch(logOut());
    }
  }

  return (
    <Button
      className={styles.logout_button}
      variant="contained"
      onClick={handleBaseLogout}
    >
      Logout
    </Button>
  );
};
