import React from "react";
import styles from "./ChatPage.module.css";
import {Typography} from "@mui/material";


const ChatPage: React.FC = () => {

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>
        Chat
      </Typography>
    </div>
  );
};

export default ChatPage;
