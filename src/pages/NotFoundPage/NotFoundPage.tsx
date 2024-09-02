import React from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <Box className={styles.box}>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}  item={true}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for does’t exist.
            </Typography>
          </Grid>
          <Grid xs={6}  item={true}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500}
              height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
