import React, {useState} from "react";
import {useFormik} from "formik";
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Checkbox, Grid2, IconButton, InputAdornment} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import {validationSchemaRegistration} from "../../validate/validationSchemaRegistration.js";
import {signUp} from "../../redux/auth/operations";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "../UserRegistrationPage/UserRegistrationPage.module.css";
import {initialValueUserRegistration} from "../../initialValues/initialValues";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const defaultTheme = createTheme();

const RegistrationForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [terms, setTerms] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: initialValueUserRegistration,
    validationSchema: validationSchemaRegistration,
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(signUp(values));
      }
    },
  });

  const handleTermsCheck = (event: { target: HTMLInputElement }) => {
    const target = event.target as HTMLInputElement;
    setTerms(target.checked);
  };

  const termsCheckboxLabel = (
    <div className={styles.checkbox}>
      I accept <a href="/terms">terms of service</a>
    </div>
  );

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <Box className={styles.box}>
            <Avatar className={styles.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              className={styles.box_submit}
            >
              <Grid2 container spacing={2}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  color="primary"
                  autoFocus
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  color="primary"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  required
                  fullWidth
                  id="home_page"
                  label="Home Page Address"
                  color="primary"
                  name="home_page"
                  autoComplete="home_page"
                  value={formik.values.home_page}
                  onChange={formik.handleChange}
                  error={formik.touched.home_page && Boolean(formik.errors.home_page)}
                  helperText={formik.touched.home_page && formik.errors.home_page}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  color="primary"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
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
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  color="primary"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid2>
              <FormControlLabel
                control={<Checkbox id="termsCheck" name="termsCheck" color="primary"/>}
                id="termsCheck"
                name="termsCheck"
                label={termsCheckboxLabel}
                onChange={handleTermsCheck}
              />
              <Button
                type="submit"
                color="primary"
                fullWidth
                variant="contained"
                className={styles.success}
                disabled={!terms}
              >
                Register
              </Button>
              <Grid2 container justifyContent="flex-end">
                <span className={styles.span}>Already have an account?</span>
                <Link to="/">
                  Login
                </Link>
              </Grid2>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default RegistrationForm;
