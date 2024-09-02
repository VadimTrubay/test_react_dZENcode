import React, {lazy} from "react";
import styles from "./App.module.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import {RouterEndpoints} from "../config/routes";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../redux/auth/selectors";
import UserRegistrationPage from "../pages/UserRegistrationPage/UserRegistrationPage.tsx";
import UserAuthorizationPage from "../pages/UserAuthorizationPage/UserAuthorizationPage.tsx";
import ChatPage from "../pages/ChatPage/ChatPage.tsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage/AboutPage"));
const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  // const isLoggedIn = useSelector<boolean>(selectIsLoggedIn);
  const isLoggedIn = true;
  // const loading = useSelector(selectLoading);


  // useEffect(() => {
  //   dispatch(getMe());
  // }, [isAuthenticated, isLoggedIn, dispatch]);

  // if (loading) {
  //   return (
  //     <Box>
  //       <LinearProgress/>
  //     </Box>
  //   );
  // }

  return (
    <Layout className={styles.container}>
      <Routes>
        <Route
          path={RouterEndpoints.signup}
          element={isLoggedIn ? <Navigate to={RouterEndpoints.index}/> : <UserRegistrationPage/>}
        />
        <Route
          path={RouterEndpoints.login}
          element={isLoggedIn ? <Navigate to={RouterEndpoints.index}/> : <UserAuthorizationPage/>}
        />
        <Route
          path={`${RouterEndpoints.chat}`}
          element={<ChatPage/>}
          // element={isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <ChatPage/>}
        />
        {/*<Route*/}
        {/*  path={RouterEndpoints.me}*/}
        {/*  element={!isLoggedIn ? <Navigate to={RouterEndpoints.login}/> : <UserProfilePage/>}*/}
        {/*/>*/}
        <Route path={RouterEndpoints.index} element={<HomePage/>}/>
        <Route path={RouterEndpoints.about} element={<AboutPage/>}/>
        <Route path={RouterEndpoints.terms} element={<TermsPage/>}/>
        <Route path={RouterEndpoints.notFound} element={<NotFoundPage/>}/>
      </Routes>
    </Layout>
  )
};

export default App;
