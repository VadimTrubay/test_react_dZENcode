import React, {ReactElement} from "react";
import {Box, Container, Grid2, Typography} from "@mui/material";
import styles from "./Footer.module.css"

export const Footer: React.FC = (): ReactElement => {
  return (
    <Box className={styles.box}>
      <Container maxWidth="lg">
        <Grid2 container direction="column" alignItems="center">
          <Typography variant="body2">
            @ Powered by VadimTrubay
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            {`${new Date().getFullYear()} | React | Material UI | React Router`}
          </Typography>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;