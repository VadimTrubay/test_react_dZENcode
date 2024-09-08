import React from "react";
import styles from "./AboutPage.module.css";
import {Typography} from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <div className={styles.title}>
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <p>dZENcode
        outstaff and outsourcing agency, IT recruiting. Python (Django, FastAPI, Flask),</p>
      <p>
        JavaScript (React, Vue, Angular), AWS.
      </p>
    </div>
  );
};

export default AboutPage;
