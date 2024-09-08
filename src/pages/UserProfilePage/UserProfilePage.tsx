import React from "react";
import {useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  Typography,
  Box,
  CircularProgress,
  Grid2
} from "@mui/material";

import {selectLoading, selectUser} from "../../redux/auth/selectors";
import {UserType} from "../../types/usersTypes";


const UserProfilePage: React.FC = () => {
  const currentUser = useSelector(selectUser) as UserType;
  const loading = useSelector(selectLoading);

  return (
    loading ?
      (
        <Box>
          <CircularProgress/>
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
