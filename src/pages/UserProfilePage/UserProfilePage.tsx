import React, {useState, useEffect} from "react";
import styles from "./UserProfilePage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Avatar from "@mui/material/Avatar";
import {
  Grid,
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  LinearProgress,
  Rating
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {AppDispatch} from "../../redux/store";
import {
  deleteUser,
  fetchUserById,
  updatePassword,
  updateUsername
} from "../../redux/users/operations";
import {logOut} from "../../redux/auth/operations";
import {validationSchemaUpdateUsername} from "../../validate/validationSchemaUpdateUsername.js";
import {validationSchemaUpdatePassword} from "../../validate/validationSchemaUpdatePassword";
import {
  initialValueUpdatePassword,
  initialValueUpdateUsername
} from "../../initialValues/initialValues";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import {selectUserById} from "../../redux/users/selectors";
import {selectLoading, selectUser} from "../../redux/auth/selectors";
import {useNavigate, useParams} from "react-router-dom";
import {mainUrls} from "../../config/urls";
import {RouterEndpoints} from "../../config/routes";
import {UserType} from "../../types/usersTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {selectGlobalRating} from "../../redux/results/selectors";
import {fetchGlobalRating} from "../../redux/results/operations";
import UserTestsList from "../../components/UsersTestsList/UserTestsList";
import {fetchMyQuizzesResults} from "../../redux/analytics/operations";

const UserProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(false);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState<boolean>(false);
  const currentUser = useSelector(selectUser) as UserType;
  const userById = useSelector(selectUserById) as UserType;
  const rating: number = useSelector(selectGlobalRating);
  const loading = useSelector<boolean>(selectLoading);

  const handleOpenEditUsernameModal = () => setOpenEditUsernameModal(true);
  const handleCloseEditUsernameModal = () => setOpenEditUsernameModal(false);
  const handleOpenEditPasswordModal = () => setOpenEditPasswordModal(true);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseEditPasswordModal = () => {
    formikEditPassword.resetForm();
    setOpenEditPasswordModal(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
      dispatch(fetchGlobalRating());
      dispatch(fetchMyQuizzesResults());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      formikEditUsername.setValues(currentUser);
    }
  }, [currentUser]);

  const formikEditUsername = useFormik({
    initialValues: initialValueUpdateUsername,
    validationSchema: validationSchemaUpdateUsername,
    onSubmit: (values) => {
      if (formikEditUsername.isValid) {
        dispatch(updateUsername(values));
      }
      handleCloseEditUsernameModal();
    },
  });

  const formikEditPassword = useFormik({
    initialValues: initialValueUpdatePassword,
    validationSchema: validationSchemaUpdatePassword,
    onSubmit: (values) => {
      if (formikEditPassword.isValid) {
        dispatch(updatePassword(values));
      }
      handleCloseEditPasswordModal();
    },
  });

  const handleDeleteUser = () => {
    if (currentUser.id) {
      dispatch(deleteUser(currentUser.id));
      dispatch(logOut());
      navigate(RouterEndpoints.login);
    }
    closeModal();
  };

  const closeModal = () => {
    setOpenEditUsernameModal(false);
    setOpenEditPasswordModal(false);
    setOpenDeleteModal(false);
  };

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        <>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            <Grid item xs={12}>
              {(userById?.id === currentUser?.id) && (
                <> <Typography variant="h6" gutterBottom>
                  Global Rating
                </Typography>
                  <Rating
                    name="global-rating"
                    value={rating * 10}
                    precision={0.1}
                    readOnly
                    max={10}
                  />
                  <Typography variant="body1" gutterBottom>
                    {rating * 100 / 10} / 10
                  </Typography>
                </>
              )}
            </Grid>
            {userById?.id === currentUser?.id &&
              <Box marginRight={2}>
                {/* MY INVITES */}
                <Button
                  onClick={() => {
                    navigate(mainUrls.actions.myInvites)
                  }}
                  variant="outlined"
                  color="success"
                  sx={{margin: 1}}
                >
                  My Invites
                </Button>

                {/* MY REQUESTS */}
                <Button
                  onClick={() => {
                    navigate(mainUrls.actions.myRequests)
                  }}
                  variant="outlined"
                  color="success"
                  sx={{margin: 1}}
                >
                  My Requests
                </Button>
              </Box>
            }
            <Grid item xs={12}>
              <Avatar/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Username:
              </Typography>
              <Typography color="textSecondary">
                {userById?.username}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Email:
              </Typography>
              <Typography color="textSecondary">
                {userById?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            {userById?.id === currentUser?.id &&
              <Box marginRight={2}>
                <Button
                  onClick={handleOpenEditUsernameModal}
                  variant="outlined"
                  startIcon={<EditIcon/>}
                  color="primary"
                  sx={{marginRight: 1}}
                >
                  Change Username
                </Button>
                <Button
                  onClick={handleOpenEditPasswordModal}
                  variant="outlined"
                  startIcon={<EditIcon/>}
                  color="primary"
                  sx={{marginRight: 1}}
                >
                  Change Password
                </Button>
                <Button
                  onClick={handleOpenDeleteModal}
                  variant="outlined"
                  startIcon={<DeleteIcon/>}
                  color="error"
                  sx={{marginRight: 1}}
                >
                  Delete Profile
                </Button>
              </Box>}
          </Grid>
          {
            userById?.id === currentUser?.id &&
            <UserTestsList/>
          }

          {/* Edit username modal */
          }
          <Modal
            open={openEditUsernameModal}
            onClose={handleCloseEditUsernameModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className={styles.close}>
                <HighlightOffIcon onClick={closeModal}/>
              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Text className={styles.title_edit}>Edit username</Text>
              </Typography>
              <StyledBox component="form" onSubmit={formikEditUsername.handleSubmit}>
                <TextField
                  id="username"
                  name="username"
                  variant="standard"
                  color="primary"
                  value={formikEditUsername.values.username}
                  onChange={formikEditUsername.handleChange}
                  onBlur={formikEditUsername.handleBlur}
                  error={formikEditUsername.touched.username && Boolean(formikEditUsername.errors.username)}
                  helperText={formikEditUsername.touched.username && formikEditUsername.errors.username}
                />
                <Button type="submit">
                  <DoneIcon sx={{fontSize: 50, color: "inherit"}}/>
                </Button>
              </StyledBox>
            </Box>
          </Modal>

          {/* Edit password modal */
          }
          <Modal
            open={openEditPasswordModal}
            onClose={handleCloseEditPasswordModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className={styles.close}>
                <HighlightOffIcon onClick={closeModal}/>
              </div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <Text className={styles.title_edit}>Edit password</Text>
              </Typography>
              <Typography variant="h6">
                <Text>password:</Text>
              </Typography>
              <StyledBox component="form" onSubmit={formikEditPassword.handleSubmit}>
                <TextField
                  id="password"
                  name="password"
                  variant="standard"
                  color="primary"
                  value={formikEditPassword.values.password}
                  onChange={formikEditPassword.handleChange}
                  onBlur={formikEditPassword.handleBlur}
                  error={formikEditPassword.touched.password && Boolean(formikEditPassword.errors.password)}
                  helperText={formikEditPassword.touched.password && formikEditPassword.errors.password}
                />
                <Typography variant="h6">
                  <Text>new password:</Text>
                </Typography>
                <TextField
                  id="new_password"
                  name="new_password"
                  variant="standard"
                  color="primary"
                  value={formikEditPassword.values.new_password}
                  onChange={formikEditPassword.handleChange}
                  onBlur={formikEditPassword.handleBlur}
                  error={formikEditPassword.touched.new_password && Boolean(formikEditPassword.errors.new_password)}
                  helperText={formikEditPassword.touched.new_password && formikEditPassword.errors.new_password}
                />
                <Typography variant="h6">
                  <Text>confirm password:</Text>
                </Typography>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="standard"
                  color="primary"
                  value={formikEditPassword.values.confirmPassword}
                  onChange={formikEditPassword.handleChange}
                  onBlur={formikEditPassword.handleBlur}
                  error={formikEditPassword.touched.confirmPassword && Boolean(formikEditPassword.errors.confirmPassword)}
                  helperText={formikEditPassword.touched.confirmPassword && formikEditPassword.errors.confirmPassword}
                />
                <Button type="submit">
                  <DoneIcon sx={{fontSize: 50, color: "inherit"}}/>
                </Button>
              </StyledBox>
            </Box>
          </Modal>

          {/* Delete modal */
          }
          <BaseModalWindow
            openModal={openDeleteModal}
            closeModal={closeModal}
            style_close={styles.close}
            color_off={"error"}
            style_title={styles.title_delete}
            title={"Delete profile"}
            text={"Are you sure you want to delete this profile?"}
            onSubmit={handleDeleteUser}
            style_done={{color: "red", fontSize: 50}}
          />
        </>
      )
  )
    ;
};

export default UserProfilePage;
