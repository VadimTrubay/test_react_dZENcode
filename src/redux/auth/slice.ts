import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {signUp, signIn, logOut, getMe} from "./operations";
import {authType, initialAuthType} from "../../types/authTypes";

const initialAuth: initialAuthType = {
  user: {
    id: "",
    username: "",
    email: "",
    home_page: "",
  },
  access_token: "",
  isLoggedIn: false,
  loading: false,
  error: null,
};

const handlePending = (state: initialAuthType) => {
  state.loading = true;
};

const handleRejected = (state: initialAuthType, action: PayloadAction<any>) => {
  state.loading = false;
  state.error = action.payload;
};

const handleSignUpFulfilled = (state: initialAuthType, action: PayloadAction<initialAuthType>) => {
  state.loading = false;
  state.error = null;
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleSignInFulfilled = (state: initialAuthType, action: PayloadAction<initialAuthType>) => {
  state.loading = false;
  state.error = null;
  state.access_token = action.payload.access_token;
  state.isLoggedIn = true;
};

const handleGetMeFulfilled = (state: initialAuthType, action: PayloadAction<authType>) => {
  state.loading = false;
  state.error = null;
  state.isLoggedIn = true;
  state.user.id = action.payload.id;
  state.user.username = action.payload.username;
  state.user.email = action.payload.email;
  state.user.home_page = action.payload.home_page;
};

const handleLogOutFulfilled = (state: initialAuthType) => {
  state.loading = false;
  state.error = null;
  state.user = {
    id: "", username: "",
    email: "", password: "",
    new_password: "",
  };
  state.access_token = "";
  state.isLoggedIn = false;
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    setAccessToken(state: initialAuthType, action: PayloadAction<string>) {
      state.access_token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, handleSignUpFulfilled)
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, handleSignInFulfilled)
      .addCase(signIn.rejected, handleRejected)
      .addCase(getMe.pending, handlePending)
      .addCase(getMe.fulfilled, handleGetMeFulfilled)
      .addCase(getMe.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, handleLogOutFulfilled)
      .addCase(logOut.rejected, handleRejected);
  }
});

export const {setAccessToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
