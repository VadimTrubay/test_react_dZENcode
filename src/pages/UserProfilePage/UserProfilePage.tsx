import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  Typography,
  Box,
  LinearProgress,
  Grid2
} from "@mui/material";
import {AppDispatch} from "../../redux/store";

import {selectLoading, selectUser} from "../../redux/auth/selectors";
import {UserType} from "../../types/usersTypes";
import {getMe} from "../../redux/auth/operations.ts";


const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser) as UserType;
  const loading = useSelector(selectLoading);

  // useEffect(() => {
  //   if (currentUser) {
  //     dispatch(getMe());
  //   }
  // }, []);

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        <>
          <Grid2 container direction="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
          </Grid2>
          <Grid2 container direction="column" alignItems="center">
            <Avatar/>
          </Grid2>
          <Grid2>
            <Typography variant="h6" fontWeight="bold">
              Username:
            </Typography>
            <Typography color="textSecondary">
              {currentUser?.username}
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h6" fontWeight="bold">
              Email:
            </Typography>
            <Typography color="textSecondary">
              {currentUser?.email}
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h6" fontWeight="bold">
              Home Page:
            </Typography>
            <Typography color="textSecondary">
              {currentUser?.home_page}
            </Typography>
          </Grid2>
        </>
      )
  )
};

export default UserProfilePage;
