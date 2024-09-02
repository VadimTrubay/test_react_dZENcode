import {Suspense} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {LayoutProps} from "../../types/layoutTypes";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "../Layout/Layout.module.css";
import {TiArrowBack} from "react-icons/ti";
import {Toaster} from "react-hot-toast";


export const Layout = ({children}: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header/>
      <Navigation/>
      <div className={styles.container_back}>
        <TiArrowBack className={styles.back} onClick={() => {
          navigate(-1)
        }}/>
      </div>
      <Suspense fallback={
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <LinearProgress/>
        </Box>
      }>
        <Toaster position="top-center"/>
        <div className={styles.children}>
          {children}
        </div>
        <Outlet/>
      </Suspense>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
};
