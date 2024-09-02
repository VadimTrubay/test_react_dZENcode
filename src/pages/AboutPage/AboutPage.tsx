import React from "react";
import styles from "./AboutPage.module.css";
import {Grid, Typography} from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <div className={styles.title}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
        </Grid>
      <p>dZENcode
        outstaff and outsourcing agency, IT recruiting. Python (Django, FastAPI, Flask),</p>
      <p>
        JavaScript (React, Vue, Angular), AWS.
      </p>
    </div>
  );
};

export default AboutPage;
