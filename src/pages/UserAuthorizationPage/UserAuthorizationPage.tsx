import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {InputAdornment, IconButton, Grid2} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {validationSchemaAuthorization} from "../../validate/validationSchemaAuthorization.js";
import {signIn} from "../../redux/auth/operations";
import {AppDispatch} from "../../redux/store";
import {selectIsLoggedIn} from "../../redux/auth/selectors";
import styles from "../UserRegistrationPage/UserRegistrationPage.module.css";
import {initialValueUserAuthorization} from "../../initialValues/initialValues";

const defaultTheme = createTheme();

const UserAuthorizationPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: initialValueUserAuthorization,
    validationSchema: validationSchemaAuthorization,
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(signIn(values));
      }
    },
  });

  return (
    !isLoggedIn && (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box className={styles.box}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className={styles.box_submit}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                color="primary"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                color="primary"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                className={styles.success}
              >
                Login
              </Button>
              <Grid2 container justifyContent="flex-end">
                <span className={styles.span}>Don't have an account?</span>
                <Link to="/signup">
                  Register
                </Link>
              </Grid2>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    )
  );
};

export default UserAuthorizationPage;
