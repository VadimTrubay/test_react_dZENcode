import React from "react";
import styles from "./HomePage.module.css";
import {Typography} from "@mui/material";


const HomePage: React.FC = () => {

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>
        Home
      </Typography>
      <Typography>
        Wellcome to single page application CHAT
      </Typography>
    </div>
  );
};

export default HomePage;